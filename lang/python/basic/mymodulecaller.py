import mymodule

def saymyname():
  print("caller callback")

mymodule.greeting('caller')
mymodule.callmeback(saymyname)