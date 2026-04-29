import 'package:flutter/material.dart';
import 'package:scanpro_ai/core/theme/app_theme.dart';
import 'package:scanpro_ai/features/dashboard/presentation/pages/dashboard_page.dart';

void main() {
  runApp(const ScanProApp());
}

class ScanProApp extends StatelessWidget {
  const ScanProApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ScanPro AI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const DashboardPage(),
    );
  }
}
