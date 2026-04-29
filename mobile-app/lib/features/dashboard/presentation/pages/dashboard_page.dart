import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          _buildAppBar(),
          SliverToBoxAdapter(child: _buildMarketSummary()),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  Text("Live Scans", style: Theme.of(context).textTheme.headlineMedium),
                  TextButton(onPressed: () {}, child: const Text("View All")),
                ],
              ),
            ),
          ),
          _buildScanList(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Colors.blueAccent,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  Widget _buildAppBar() {
    return SliverAppBar(
      expandedHeight: 120,
      floating: true,
      pinned: true,
      backgroundColor: const Color(0xFF0F172A),
      flexibleSpace: FlexibleSpaceBar(
        title: Text("ScanPro AI", 
          style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 24)),
        centerTitle: false,
        titlePadding: const EdgeInsets.only(left: 20, bottom: 16),
      ),
      actions: [
        IconButton(icon: const Icon(Icons.notifications_outlined), onPressed: () {}),
        const Padding(
          padding: EdgeInsets.only(right: 16),
          child: CircleAvatar(
            backgroundColor: Colors.blueAccent,
            child: Text("AB", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
          ),
        ),
      ],
    );
  }

  Widget _buildMarketSummary() {
    return Container(
      height: 100,
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        children: [
          _buildStatCard("NIFTY 50", "22,450.20", "+0.45%", Colors.emeraldAccent),
          _buildStatCard("BANK NIFTY", "48,120.45", "-0.12%", Colors.redAccent),
          _buildStatCard("FIN NIFTY", "21,340.10", "+0.89%", Colors.emeraldAccent),
        ],
      ),
    );
  }

  Widget _buildStatCard(String label, String price, String change, Color color) {
    return Card(
      child: Container(
        width: 160,
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontSize: 10, color: Colors.grey)),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                Text(price, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                Text(change, style: TextStyle(fontSize: 10, color: color, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildScanList() {
    final List<Map<String, dynamic>> scans = [
      {"name": "Golden Cross", "symbol": "RELIANCE", "price": "₹2,940", "change": "+2.4%"},
      {"name": "RSI Oversold", "symbol": "TCS", "price": "₹3,840", "change": "-0.5%"},
      {"name": "Volume Spike", "symbol": "HDFCBANK", "price": "₹1,420", "change": "+1.2%"},
    ];

    return SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final scan = scans[index];
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Card(
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.blueAccent.withOpacity(0.1),
                  child: const FaIcon(FontAwesomeIcons.magnifyingGlassChart, size: 16, color: Colors.blueAccent),
                ),
                title: Text(scan['name'], style: const TextStyle(fontWeight: FontWeight.bold)),
                subtitle: Text(scan['symbol'], style: const TextStyle(fontSize: 12)),
                trailing: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(scan['price'], style: const TextStyle(fontWeight: FontWeight.bold)),
                    Text(scan['change'], style: TextStyle(
                      color: scan['change'].startsWith('+') ? Colors.emeraldAccent : Colors.redAccent,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    )),
                  ],
                ),
              ),
            ).animate().fadeIn(delay: (index * 100).ms).slideX(begin: 0.1),
          );
        },
        childCount: scans.length,
      ),
    );
  }
}
