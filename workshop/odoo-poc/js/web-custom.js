document.addEventListener('DOMContentLoaded', async () => {
  const session = await getSession()
  if (!session) return
  await renderCalendar({ userId: session.uid })
  await renderMyApprovals({ session })
  injectRequestOwner(session)

})

const injectRequestOwner = (session) => {
  document.querySelectorAll('form[data-model_name="approval.request"] input[name=request_owner_id]').forEach((element) => element.remove())
  document.querySelectorAll('form[data-model_name="approval.request"] input[name=x_studio_web_form_partner]').forEach((element) => element.remove())
  const form = document.querySelector('form[data-model_name="approval.request"]')
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'x_studio_web_form_partner'
  input.value = session.partner_id
  form.appendChild(input)
}

function stripHTML(html) {
  const t = document.createElement('div')
  t.innerHTML = html || ''
  return t.textContent || t.innerText || ''
}

function fmtRange(startISO, endISO) {
  try {
    const tz = 'Asia/Bangkok'
    const d1 = new Date(startISO), d2 = new Date(endISO)
    const dopt = { timeZone: tz, year: 'numeric', month: 'short', day: 'numeric' }
    const topt = { timeZone: tz, hour: '2-digit', minute: '2-digit' }
    const dFmt = new Intl.DateTimeFormat('th-TH', dopt)
    const tFmt = new Intl.DateTimeFormat('th-TH', topt)
    const same = d1.toDateString() === d2.toDateString()
    return same
      ? `${dFmt.format(d1)} • ${tFmt.format(d1)} – ${tFmt.format(d2)}`
      : `${dFmt.format(d1)} ${tFmt.format(d1)} → ${dFmt.format(d2)} ${tFmt.format(d2)}`;
  } catch { return `${startISO} → ${endISO}`; }
}

function badge(status) {
  const s = (status || '').toLowerCase();
  const el = document.createElement('span');
  el.className = 'xmy-badge ' + (
    s.includes('approve') ? 'xmy-badge--approved' :
      s.includes('refuse') ? 'xmy-badge--refused' :
        'xmy-badge--pending'
  );
  el.innerText = s.includes('approve') ? 'อนุมัติแล้ว'
    : s.includes('refuse') ? 'ปฏิเสธ'
      : 'รอดำเนินการ';
  return el;
}

async function renderCalendar({ userId }) {
  const box = document.getElementById('x-calendar');
  if (!box) return;

  const data = await fetchApprovals({
    userId,
    domain: [["request_status", "=", "approved"]],
  });

  const events = data.map(it => ({
    title: (it.x_studio_vehicle && it.x_studio_vehicle[1]) || 'รายการ',
    start: new Date(it.date_start),
    end: new Date(it.date_end),
  }));

  // เคลียร์ก่อน
  box.innerHTML = '';

  const cal = new FullCalendar.Calendar(box, {
    locale: 'th',
    initialView: 'dayGridMonth',
    height: 'auto',
    expandRows: true,
    displayEventTime: false,
    events,
  });

  cal.render();

  // 💡 แก้จังหวะ layout เพี้ยนตอนแสดงครั้งแรก/คอลัมน์กว้างเปลี่ยน
  // อัปเดตขนาดหลัง render 1 ช็อต
  setTimeout(() => cal.updateSize(), 0);
  // และคอยสังเกตการเปลี่ยนขนาด container แล้วค่อย update แบบ debounce
  const ro = new ResizeObserver(() => {
    clearTimeout(cal.__resizeTimer);
    cal.__resizeTimer = setTimeout(() => cal.updateSize(), 60);
  });
  ro.observe(box);

  if (!events.length) {
    const empty = document.createElement('div');
    empty.className = 'xcal-empty';
    empty.innerText = 'ยังไม่มีการใช้งานรถที่อนุมัติ';
    box.appendChild(empty);
  }
}


async function renderMyApprovals(args) {
  const box = document.getElementById('x-my-approval-box');
  if (!box) return
  if (!args.session) return
  const data = await fetchApprovals({
    userId: args.session.uid,
    domain: [["x_studio_web_form_partner", "=", args.session.partner_id]]
  })
  box.innerHTML = ''
  if (!data.length) {
    const empty = document.createElement('div')
    empty.className = 'xmy-empty'
    empty.innerText = 'คุณยังไม่มีคำขอจองรถ'
    box.appendChild(empty);
    return;
  }
  data.forEach(item => {
    const row = document.createElement('div');
    row.className = 'xmy-item';
    const add = (label, value) => {
      const l = document.createElement('div')
      l.className = 'xmy-label'
      l.innerText = label
      const v = document.createElement('div')
      v.className = 'xmy-value'
      if (value instanceof Node) v.appendChild(value)
      else v.innerText = value ?? '-'
      row.appendChild(l)
      row.appendChild(v)
    }
    add('ชื่อผู้ขอยืมรถ', item.partner_id ? item.partner_id[1] : '-')
    add('ทะเบียนรถ', (item.x_studio_vehicle && item.x_studio_vehicle[1]) || '-')
    add('ช่วงเวลาใช้งาน', fmtRange(item.date_start, item.date_end))
    add('สถานะ', badge(item.request_status))
    add('เหตุผลในการขอ', stripHTML(item.reason))
    box.appendChild(row)
  })
}

const fetchApprovals = async (args = {}) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/web/dataset/call_kw/approval.request/web_search_read',
      data: {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "approval.request",
          method: "search_read",
          args: [],
          kwargs: {
            order: "id DESC",
            context: { lang: "th_TH", tz: "Asia/Bangkok", uid: args.userId },
            domain: [
              ["category_id", "=", "Car Reservation"],
              ...(args.domain || [])
            ],
            fields: ["date_start", "date_end", "x_studio_vehicle", "request_status", "reason", 'partner_id']
          }
        }
      }
    });
    return res?.data?.result || [];
  } catch (e) { console.error(e); return []; }
}

const getSession = async () => {
  try {
    const res = await axios({
      method: 'post',
      url: '/web/session/get_session_info',
      data: { jsonrpc: "2.0", method: "call" }
    })
    if (!res.data || res.data.error) return
    return res.data.result
  } catch (err) {
    console.error(err)
  }
}