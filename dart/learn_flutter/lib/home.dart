import 'package:flutter/material.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _State();
}

class _State extends State<MyHomePage> with AutomaticKeepAliveClientMixin {
  final List<String> _todos = [];
  final TextEditingController _controller = TextEditingController();

  void _addTodo() {
    final text = _controller.text.trim();
    if (text.isNotEmpty) {
      setState(() {
        _todos.add(text);
      });
      _controller.clear();
    }
  }

  void _removeTodo(int index) {
    setState(() {
      _todos.removeAt(index);
    });
  }

  @override
  bool get wantKeepAlive {
    return true;
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _controller,
                  decoration: InputDecoration(
                    labelText: 'Add new task',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              SizedBox(width: 8),
              ElevatedButton(onPressed: _addTodo, child: Text('Add')),
            ],
          ),
          SizedBox(height: 20),
          Expanded(
            child: _todos.isEmpty
                ? Center(child: Text('No tasks yet!'))
                : ListView.builder(
                    itemCount: _todos.length,
                    itemBuilder: (context, index) {
                      return Card(
                        child: ListTile(
                          title: Text(_todos[index]),
                          trailing: IconButton(
                            icon: Icon(Icons.delete, color: Colors.red),
                            onPressed: () => _removeTodo(index),
                          ),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
