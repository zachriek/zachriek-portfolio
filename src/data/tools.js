/**
 * Penetration Testing Tools Dataset
 * Contains essential cybersecurity & pentesting tools used in security assessments.
 */

export const PENTEST_TOOLS = [
  {
    id: 'burpsuite',
    name: 'Burp Suite',
    category: 'Web Application Security',
    icon: 'globe',
    badge: 'Proxy & Scanner',
    color: '#ff793f',
    command: 'burpsuite',
    description: 'The industry-standard platform for security testing of web applications, featuring an intercepting proxy, web vulnerability scanner, repeater, and automated fuzzing.',
    details: 'Used to inspect and modify traffic between browser and target web applications. Essential for finding OWASP Top 10 vulnerabilities (XSS, SQLi, CSRF, SSRF, IDOR).',
    features: [
      'HTTP/HTTPS Intercepting Proxy',
      'Target Site Mapping & Crawler',
      'Automated Vulnerability Scanner',
      'Intruder Payload Automation',
      'Repeater Manual Testing'
    ],
    sampleOutput: '[+] Burp Suite Community Edition v2026.1\n[+] Intercepting proxy running on 127.0.0.1:8080\n[+] Proxy listener active. Capturing HTTP/2 traffic...'
  },
  {
    id: 'nmap',
    name: 'Nmap',
    category: 'Network Reconnaissance',
    icon: 'crosshair',
    badge: 'Port Scanner',
    color: '#34ace0',
    command: 'nmap -sV -sC -T4 -p- target.lab',
    description: 'Network exploration tool and security / port scanner. Discovers live hosts, open TCP/UDP ports, running services with version detection, and OS fingerprinting.',
    details: 'Supports the Nmap Scripting Engine (NSE) with hundreds of scripts for vulnerability detection, advanced service discovery, and backdoor detection.',
    features: [
      'SYN Stealth & Full Connect Scan',
      'Service Version Fingerprinting (-sV)',
      'OS Detection & Uptime Estimation (-O)',
      'Nmap Scripting Engine (NSE)',
      'Subnet Discovery & Fast CIDR Sweeping'
    ],
    sampleOutput: 'Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for target.lab (192.168.1.105)\nPORT     STATE SERVICE VERSION\n22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu\n80/tcp   open  http    Apache httpd 2.4.52\n443/tcp  open  ssl/ssl OpenSSL 3.0.2\nNmap done: 1 IP address scanned in 3.12 seconds'
  },
  {
    id: 'metasploit',
    name: 'Metasploit Framework',
    category: 'Exploitation Framework',
    icon: 'skull',
    badge: 'Exploitation',
    color: '#ff5252',
    command: 'msfconsole -q',
    description: 'World\'s most used penetration testing framework providing hundreds of verified exploit modules, auxiliary scanners, and advanced Meterpreter payloads.',
    details: 'Enables security professionals to verify vulnerabilities, manage security assessments, and improve security awareness with modular penetration testing capabilities.',
    features: [
      '2,300+ Verified Exploit Modules',
      'Advanced Payload Generator (msfvenom)',
      'In-memory Meterpreter Post-Exploitation',
      'Automated Auxiliary Scanners',
      'Multi-platform Target Support'
    ],
    sampleOutput: '  =[ metasploit v6.3.55-dev                          ]\n+ -- --=[ 2381 exploits - 1234 auxiliary - 413 post       ]\n+ -- --=[ 1385 payloads - 46 encoders - 11 nops           ]\nmsf6 > use exploit/multi/handler\nmsf6 exploit(multi/handler) > set PAYLOAD linux/x64/meterpreter/reverse_tcp'
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'Packet Analysis & Forensics',
    icon: 'activity',
    badge: 'Packet Sniffer',
    color: '#2ed573',
    command: 'wireshark -i eth0 -k',
    description: 'The world\'s foremost network protocol analyzer. Captures packet data in real-time, displays packets with detailed protocol inspection, and filters traffic.',
    details: 'Used for network troubleshooting, analysis, software and communications protocol development, and deep digital forensics examination.',
    features: [
      'Live Capture and Offline Analysis',
      'Microsecond Packet Timestamping',
      'Deep Inspection of Hundreds of Protocols',
      'Powerful Display Filter Syntax',
      'Follow TCP / TLS Stream Reassembly'
    ],
    sampleOutput: 'Capturing on \'eth0\'\nPackets: 1482  Displayed: 1482 (100.0%)\n1  0.000000  192.168.1.50 -> 192.168.1.1   DNS Standard query A target.com\n2  0.014210  192.168.1.1  -> 192.168.1.50   DNS Standard query response 93.184.216.34\n3  0.014580  192.168.1.50 -> 93.184.216.34  TCP 52140 → 443 [SYN] Seq=0 Win=64240'
  },
  {
    id: 'sqlmap',
    name: 'SQLMap',
    category: 'Database Pentest',
    icon: 'key',
    badge: 'SQL Injection',
    color: '#e056fd',
    command: 'sqlmap -u "https://target.lab/item.php?id=1" --batch --dbs',
    description: 'Automatic SQL injection and database takeover tool. Automates the process of detecting and exploiting SQL injection flaws and taking over database servers.',
    details: 'Features a powerful detection engine, supports 6 SQL injection techniques (boolean-based, error-based, union-based, stacked queries, time-based, out-of-band).',
    features: [
      'Full Support for MySQL, PostgreSQL, Oracle, MSSQL, SQLite',
      'Automatic DBMS Fingerprinting',
      'Database Schema and Table Enumeration',
      'Data Extraction & Credential Hash Cracking',
      'Arbitrary SQL Query Execution'
    ],
    sampleOutput: '        ___ \n       __H__\n ___ ___[,]_____ ___ ___  {1.8#stable}\n|_ -| . [)]     | .\'| . |\n|___|_  ["]_|_|_|__,|  _|\n      |_|           |_|   https://sqlmap.org\n\n[INFO] GET parameter \'id\' is vulnerable.\n[INFO] the back-end DBMS is MySQL >= 5.0.12\navailable databases [3]:\n[*] information_schema\n[*] production_db\n[*] user_credentials'
  },
  {
    id: 'john',
    name: 'John the Ripper',
    category: 'Password Security',
    icon: 'lock',
    badge: 'Hash Cracker',
    color: '#ffb142',
    command: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
    description: 'Fast password cracker available for Unix, Windows, and macOS. Tests password strength, audits encrypted hashes, and cracks common password formats.',
    details: 'Supports hundreds of hash and cipher types, including Unix crypt, Windows LM/NTLM, Kerberos, SHA-crypt, bcrypt, and password-protected zip/pdf archives.',
    features: [
      'Dictionary, Wordlist & Rule-Based Attacks',
      'Brute-Force & Mask Attack Modes',
      'Hash Identification Engine',
      'Multi-core CPU Parallelization',
      'Support for 100+ Cryptographic Hash Types'
    ],
    sampleOutput: 'Loaded 4 password hashes with 4 different salts (bcrypt [Blowfish 32/64 X3])\nCost 1 (iteration count) is 1024 for all loaded hashes\nWill run 8 OpenMP threads\nPress \'q\' or Ctrl-C to abort, almost any other key for status\nadmin123         (administrator)\nqwerty2026       (guest)\n2g 0:00:00:14 100% 2/3 0.1388g/s 842.1p/s 842.1c/s 842.1C/s'
  },
  {
    id: 'owasp-zap',
    name: 'OWASP ZAP',
    category: 'Web Application Security',
    icon: 'shield',
    badge: 'DAST Scanner',
    color: '#00d2d3',
    command: 'zaproxy -cmd -quickurl https://target.lab -quickout report.html',
    description: 'The Zed Attack Proxy (ZAP) is a widely used open-source web application security scanner maintained by OWASP for automated and manual vulnerability assessment.',
    details: 'Ideal for developers and functional testers who are new to penetration testing, as well as seasoned security testing practitioners.',
    features: [
      'Automated Active & Passive Scanning',
      'AJAX Spider for Dynamic SPAs',
      'WebSockets Message Interception',
      'Fuzzing with Predefined Payload Sets',
      'CI/CD Pipeline Integration'
    ],
    sampleOutput: '[ZAP-Daemon] Initializing ZAP Core v2.14.0\n[ZAP-Daemon] Scanning target: https://target.lab\n[ZAP-Spider] Crawled 64 endpoints\n[ZAP-ActiveScanner] Running 48 active rule plugins\n[ZAP-Report] 0 High, 2 Medium (Missing Anti-CSRF Token), 3 Low alerts found.'
  },
  {
    id: 'aircrack',
    name: 'Aircrack-ng',
    category: 'Wireless Pentest',
    icon: 'wifi',
    badge: 'WiFi Security',
    color: '#1dd1a1',
    command: 'aircrack-ng -w wordlist.txt -b 00:11:22:33:44:55 capture.cap',
    description: 'Complete suite of tools to assess WiFi network security. Covers 802.11 monitoring, packet capturing, fake access point attacks, and WEP/WPA key cracking.',
    details: 'Includes airodump-ng for packet capturing, aireplay-ng for packet injection and deauthentication attacks, and airmon-ng for wireless interface configuration.',
    features: [
      '802.11 Monitor Mode Injection (airmon-ng)',
      'Raw 802.11 Packet Sniffing (airodump-ng)',
      'Deauthentication & Replay Attacks (aireplay-ng)',
      'WPA/WPA2-PSK 4-Way Handshake Cracking',
      'WPS Pin Brute-Forcing Compatibility'
    ],
    sampleOutput: '                               Aircrack-ng 1.7\n\n [00:01:24] 412,890 keys tested (4912.4 k/s)\n\n      KEY FOUND! [ cybersec2026 ]\n\n      Master Key     : 24 AA BC 11 92 84 E1 99 28 31 01 FA EE 83 D4 AA\n      Transient Key  : 09 82 71 82 39 41 99 28 41 82 91 00 AA BC DF 12\n      EAPOL HMAC     : 44 19 28 39 12 09 83 22 19 82 71 62 55 19 22 09'
  },
  {
    id: 'hydra',
    name: 'THC Hydra',
    category: 'Credential Assessment',
    icon: 'shield',
    badge: 'Brute-Forcer',
    color: '#ee5253',
    command: 'hydra -L users.txt -P passwords.txt 192.168.1.100 ssh -t 4',
    description: 'Very fast network logon cracker supporting numerous attack protocols (SSH, FTP, HTTP, HTTPS, SMB, MySQL, RDP, Telnet, IMAP, and POP3).',
    details: 'Provides researchers and security consultants the possibility to test and demonstrate unauthorized remote access via weak credentials.',
    features: [
      'High-speed Parallel Threading (-t)',
      'Modular Protocol Architecture (50+ protocols)',
      'HTTP Form GET/POST & Basic Auth Support',
      'Proxy and SOCKS5 Support',
      'Detailed Response Grepping & Timing Rules'
    ],
    sampleOutput: 'Hydra v9.5 (c) 2023 by van Hauser / THC & David Maciejak\n[DATA] max 4 tasks per target, 1 target, 480 login tries in total\n[STATUS] 120.00 tries/min, 120 tries in 00:01h\n[22][ssh] host: 192.168.1.100   login: secops   password: Password@123\n1 of 1 target completed, 1 valid password found'
  },
  {
    id: 'gobuster',
    name: 'Gobuster',
    category: 'Web & DNS Enumeration',
    icon: 'search',
    badge: 'Directory Buster',
    color: '#10ac84',
    command: 'gobuster dir -u https://target.lab -w /usr/share/wordlists/dirb/common.txt',
    description: 'Fast directory, file, and DNS subdomain brute-forcing tool written in Go. Ideal for discovering hidden endpoints, configuration backups, and administrative portals.',
    details: 'Known for high performance, low resource consumption, and concurrent multi-threaded execution without heavy interpreter overhead.',
    features: [
      'Directory / File Mode (dir)',
      'DNS Subdomain Brute-force (dns)',
      'Virtual Host Discovery (vhost)',
      'Open Amazon S3 Bucket Enumeration (s3)',
      'Custom HTTP Status Code Filtering'
    ],
    sampleOutput: '===============================================================\nGobuster v3.6 - By OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)\n===============================================================\n[+] Url:                     https://target.lab\n[+] Method:                  GET\n[+] Threads:                 10\n[+] Wordlist:                /usr/share/wordlists/dirb/common.txt\n===============================================================\n/admin                (Status: 301) [Size: 178] [--> /admin/]\n/api                  (Status: 200) [Size: 42]\n/robots.txt           (Status: 200) [Size: 31]\n/server-status        (Status: 403) [Size: 278]\n==============================================================='
  }
];

export const getToolById = (id) => {
  return PENTEST_TOOLS.find(t => t.id === id) || null;
};
