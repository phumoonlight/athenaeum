import 'package:flutter/material.dart';
import 'package:learn_flutter/home.dart';
import 'package:learn_flutter/my_http.dart';
import 'package:learn_flutter/webtoon.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: Colors.green)),
      home: DefaultTabController(
        length: 4,
        child: Scaffold(
          appBar: AppBar(title: Text("Title")),
          body: Padding(
            padding: const EdgeInsets.all(0),
            child: TabBarView(children: [MyHomePage(), WebtoonClone(), MyHttp(), MyHttp()]),
          ),
          bottomNavigationBar: const TabBar(
            padding: EdgeInsets.symmetric(vertical: 24),
            tabs: [
              Tab(icon: Icon(Icons.directions_car)),
              Tab(icon: Icon(Icons.directions_transit)),
              Tab(icon: Icon(Icons.directions_bike)),
              Tab(icon: Icon(Icons.abc)),
            ],
          ),
        ),
      ),
    );
  }
}

// class MyHomePage extends StatefulWidget {
//   const MyHomePage({super.key, required this.title});

//   // This widget is the home page of your application. It is stateful, meaning
//   // that it has a State object (defined below) that contains fields that affect
//   // how it looks.

//   // This class is the configuration for the state. It holds the values (in this
//   // case the title) provided by the parent (in this case the App widget) and
//   // used by the build method of the State. Fields in a Widget subclass are
//   // always marked "final".

//   final String title;

//   @override
//   State<MyHomePage> createState() => _MyHomePageState();
// }

// class _MyHomePageState extends State<MyHomePage> {
//   // final List<String> items = ['Apple', 'Banana', 'Cherry', 'Date'];
//   // int _counter = 0;

//   // void _incrementCounter() {
//   //   setState(() {
//   //     // This call to setState tells the Flutter framework that something has
//   //     // changed in this State, which causes it to rerun the build method below
//   //     // so that the display can reflect the updated values. If we changed
//   //     // _counter without calling setState(), then the build method would not be
//   //     // called again, and so nothing would appear to happen.
//   //     _counter++;
//   //   });
//   // }

//   int _selectedIndex = 0;

//   final List<String> _todos = [];

//   final TextEditingController _controller = TextEditingController();

//   final List<Widget> _pages = [
//     Center(child: Text('Home Page')),
//     Center(child: Text('Tasks Page')),
//     Center(child: Text('Settings Page')),
//   ];

//   void _addTodo() {
//     final text = _controller.text.trim();
//     if (text.isNotEmpty) {
//       setState(() {
//         _todos.add(text);
//       });
//       _controller.clear();
//     }
//   }

//   void _removeTodo(int index) {
//     setState(() {
//       _todos.removeAt(index);
//     });
//   }

//   void _onNavTapped(int index) {
//     setState(() {
//       _selectedIndex = index;
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('To-Do List'),
//         bottom: const TabBar(
//           tabs: [
//             Tab(icon: Icon(Icons.directions_car)),
//             Tab(icon: Icon(Icons.directions_transit)),
//             Tab(icon: Icon(Icons.directions_bike)),
//           ],
//         ),
//       ),
//       body: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Column(
//           children: [
//             MyCounter(),
//             Row(
//               children: [
//                 Expanded(
//                   child: TextField(
//                     controller: _controller,
//                     decoration: InputDecoration(
//                       labelText: 'Add new task',
//                       border: OutlineInputBorder(),
//                     ),
//                   ),
//                 ),
//                 SizedBox(width: 8),
//                 ElevatedButton(onPressed: _addTodo, child: Text('Add')),
//               ],
//             ),
//             SizedBox(height: 20),
//             Expanded(
//               child: _todos.isEmpty
//                   ? Center(child: Text('No tasks yet!'))
//                   : ListView.builder(
//                       itemCount: _todos.length,
//                       itemBuilder: (context, index) {
//                         return Card(
//                           child: ListTile(
//                             title: Text(_todos[index]),
//                             trailing: IconButton(
//                               icon: Icon(Icons.delete, color: Colors.red),
//                               onPressed: () => _removeTodo(index),
//                             ),
//                           ),
//                         );
//                       },
//                     ),
//             ),
//           ],
//         ),
//       ),
//       bottomNavigationBar: BottomNavigationBar(
//         currentIndex: _selectedIndex,
//         onTap: _onNavTapped,
//         items: const [
//           BottomNavigationBarItem(icon: Icon(Icons.list), label: 'Tasks'),
//           BottomNavigationBarItem(icon: Icon(Icons.list), label: 'X'),
//           BottomNavigationBarItem(
//             icon: Icon(Icons.settings),
//             label: 'Settings',
//           ),
//         ],
//       ),
//     );
//   }
// }
