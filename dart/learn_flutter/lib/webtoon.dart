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
