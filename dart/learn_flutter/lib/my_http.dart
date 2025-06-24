import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Album {
  final List<Map<String, dynamic>> data;

  const Album({this.data = const []});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(data: List<Map<String, dynamic>>.from(json['data'] ?? []));
  }
}

class MyHttp extends StatefulWidget {
  const MyHttp({super.key});

  @override
  State<MyHttp> createState() => _State();
}

class _State extends State<MyHttp> {
  int count = 0;
  late Future<Album> futureAlbum;

  Future<Album> fetchAlbum() async {
    final url = Uri.parse('https://api.jikan.moe/v4/top/anime?type=movie');
    final res = await http.get(url);
    if (res.statusCode == 200) {
      return Album.fromJson(jsonDecode(res.body) as Map<String, dynamic>);
    }
    throw Exception('Failed to load albumx');
  }

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: FutureBuilder<Album>(
        future: futureAlbum,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Text('${snapshot.error}');
          }
          if (snapshot.hasData) {
            return ListView.builder(
              padding: const EdgeInsets.only(),
              itemCount: snapshot.data?.data.length,
              itemBuilder: (context, index) {
                return Container(
                  height: 150,
                  padding: const EdgeInsets.all(8),
                  margin: EdgeInsets.zero,
                  decoration: BoxDecoration(
                    // backgroundBlendMode: BlendMode.clear,
                    image: DecorationImage(
                      image: NetworkImage(snapshot.data?.data[index]['images']['jpg']['image_url'] ?? ''), // Your image URL
                      fit: BoxFit.cover,
                      alignment: Alignment.topCenter,
                    ),
                    border: Border(bottom: BorderSide(color: Colors.black87, width: 4)),
                  ),
                  child: Stack(
                    children: [
                      Text(
                        snapshot.data?.data[index]['title'] ?? 'No Title',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          shadows: const [Shadow(color: Colors.black87, offset: Offset(2, 2), blurRadius: 4)],
                        ),
                      ),
                      // Image(height: 200, image: NetworkImage(snapshot.data?.data[index]['images']['jpg']['image_url'] ?? '')),
                      // Text('Score: ${snapshot.data?.data[index]['score'] ?? 'No Score'}', style: const TextStyle(fontSize: 12, color: Colors.grey)),
                      // Link
                      // TextButton(
                      //   onPressed: () {
                      //     final String url = snapshot.data?.data[index]['url'] ?? '';
                      //     if (url.isNotEmpty) {
                      //       launchUrl(Uri.parse(url));
                      //     }
                      //   },
                      //   child: const Text('View More', style: TextStyle(color: Colors.blue)),
                      // ),
                    ],
                  ),
                );
              },
            );
          }
          return const CircularProgressIndicator(backgroundColor: Colors.blue, color: Colors.white);
        },
      ),
    );
  }
}
