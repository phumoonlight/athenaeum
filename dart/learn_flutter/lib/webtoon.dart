import 'package:flutter/material.dart';

class WebtoonClone extends StatefulWidget {
  const WebtoonClone({super.key});

  @override
  State<WebtoonClone> createState() => _State();
}

class _State extends State<WebtoonClone> with AutomaticKeepAliveClientMixin {
  int count = 0;

  @override
  bool get wantKeepAlive {
    return count > 5;
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      appBar: AppBar(title: const Text("Webtoon Clone")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Webtoon Clone Count: $count'),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  count++;
                });
              },
              child: const Text('Increment Count'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Go Back'),
            ),
          ],
        ),
      ),
    );
  }
}
