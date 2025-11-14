import 'package:flutter/material.dart';
import 'package:learn_flutter/view_api_anime.dart';
import 'package:learn_flutter/view_todo.dart';
import 'package:learn_flutter/webtoon.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home Page')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => WebtoonClone()));
              },
              child: Text('Go to Webtoon'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => ApiAnime()));
              },
              child: Text('Go to API Anime'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => ViewTodo()));
              },
              child: Text('Go to To-Do List'),
            ),
          ],
        ),
      ),
    );
  }
}
