import hashlib
import json
import sqlite3
import model

db_path = './example.db'
db_connection = sqlite3.connect(db_path)
db_cursor = db_connection.cursor()

db_cursor.execute("""
CREATE TABLE IF NOT EXISTS items (
  id INTEGER NOT NULL PRIMARY KEY, 
  hash TEXT
)
""")

myvalue = {
    "value": hash('seed')
}
print(myvalue)
checker_value = json.dumps(myvalue, sort_keys=True)
encrypted = hashlib.md5(checker_value.encode('utf-8')).hexdigest()
db_cursor.execute(f"""
INSERT INTO items (hash) VALUES ('{encrypted}');
""")
db_connection.commit()

db_cursor.execute("SELECT * FROM items")
rows = db_cursor.fetchall()
item_list = []

for row in rows:
    item = model.Item()
    item.id = row[0]
    item.hash = row[1]
    item_list.append(item)

print(len(item_list))
