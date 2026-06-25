document.addEventListener('DOMContentLoaded', async () => {
  const session = await getSession();
  if (!session) return;
  renderCalendar({ userId: session.uid });
});

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

async function fetchApprovals(args = {}) {
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
            fields: ["date_start", "date_end", "x_studio_vehicle"]
          }
        }
      }
    });
    return res?.data?.result || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function getSession() {
  try {
    const res = await axios({
      method: 'post',
      url: '/web/session/get_session_info',
      data: { jsonrpc: "2.0", method: "call" }
    });
    if (!res.data || res.data.error) return;
    return res.data.result;
  } catch (e) {
    console.error(e);
  }
}