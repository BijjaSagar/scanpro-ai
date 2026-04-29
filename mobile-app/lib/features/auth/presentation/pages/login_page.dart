import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Icon(Icons.bolt, size: 80, color: Colors.blueAccent)
                .animate()
                .scale(duration: 600.ms, curve: Curves.backOut),
            const SizedBox(height: 16),
            Text(
              "Welcome Back",
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headlineLarge,
            ).animate().fadeIn(delay: 200.ms),
            const SizedBox(height: 8),
            const Text(
              "Sign in to your ScanPro AI account",
              textAlign: TextAlign.center,
              style: TextStyle(color: Color(0xFF94A3B8)),
            ).animate().fadeIn(delay: 400.ms),
            const SizedBox(height: 48),
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                hintText: "Email Address",
                prefixIcon: Icon(Icons.email_outlined),
              ),
            ).animate().slideY(begin: 0.1, delay: 600.ms).fadeIn(),
            const SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              obscureText: true,
              decoration: const InputDecoration(
                hintText: "Password",
                prefixIcon: Icon(Icons.lock_outline),
              ),
            ).animate().slideY(begin: 0.1, delay: 700.ms).fadeIn(),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                // Handle login
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueAccent,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: const Text("Sign In", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            ).animate().scale(delay: 800.ms, duration: 400.ms),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text("Don't have an account?", style: TextStyle(color: Color(0xFF94A3B8))),
                TextButton(
                  onPressed: () {},
                  child: const Text("Sign Up", style: TextStyle(color: Colors.blueAccent)),
                ),
              ],
            ).animate().fadeIn(delay: 1000.ms),
          ],
        ),
      ),
    );
  }
}
