import v from 'vertica-nodejs'

const client = new v.Client({
  user: 'dbadmin',
  host: '174.138.17.216',
  database: 'vdb',
  password: 'vertica',
  port: 5433,
})

client.connect()
client.query("SELECT c.* FROM public.cities AS c where c.population > 999999", (err, res) => {
  console.log(err || res.rows)
  client.end()
})