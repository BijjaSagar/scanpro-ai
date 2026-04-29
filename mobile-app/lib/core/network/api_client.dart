import 'package:dio/dio.dart';

class ScannerService {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'http://localhost:8002', // Scanner Engine
    connectTimeout: const Duration(seconds: 5),
    receiveTimeout: const Duration(seconds: 3),
  ));

  Future<List<Map<String, dynamic>>> runScan(List<Map<String, dynamic>> rules) async {
    try {
      final response = await _dio.post('/scan', data: {'rules': rules});
      if (response.statusCode == 200) {
        return List<Map<String, dynamic>>.from(response.data['results']);
      }
      return [];
    } catch (e) {
      print("Scan Error: $e");
      return [];
    }
  }
}

class ApiService {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'http://localhost:8000/api', // Laravel Backend
  ));

  Future<Map<String, dynamic>?> getPortfolio() async {
    try {
      final response = await _dio.get('/portfolio');
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
