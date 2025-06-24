import 'package:flutter/material.dart';

class MyCounter extends StatefulWidget {
  const MyCounter({super.key});

  @override
  State<MyCounter> createState() => _MyCounterState();
}

class _MyCounterState extends State<MyCounter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $count'),
        TextButton(
          onPressed: () {
            setState(() {
              count++;
            });
          },
          child: Text('Increment'),
        ),
      ],
    );
  }
}
