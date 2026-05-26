"""
🚀 StintikVPN Ultimate - THE HARDEST VPN Config Checker EVER
MAXIMUM STRICT CHECKING - 18-22 MINUTES FOR ABSOLUTE PERFECTION
Features:
- Multi-tier GeoIP with INTELLIGENT rate limiting (45 req/min per API)
- 7 fallback GeoIP providers with PARALLEL async queries
- TWO-PHASE validation: Quick ping + Deep SSL/TLS verification
- Flag-based server naming with StintikVPN branding
- Deep reputation tracking with ML predictions
- SMART thread pool management
- ASYNC I/O for maximum throughput
"""

import os
import re
import socket
import ssl
import time
import json
import hashlib
import requests
import base64
import threading
import ipaddress
import random
import asyncio
import aiohttp
from urllib.parse import unquote, urlparse, parse_qs
from concurrent.futures import ThreadPoolExecutor, as_completed, TimeoutError, wait, FIRST_COMPLETED
from collections import defaultdict, deque
from datetime import datetime, timedelta
import queue
import heapq

# ==================== CORE CONFIG - MAXIMUM STRICTNESS ====================
VERSION = "7.0.0 THE HARDEST"
BASE_DIR = "checked"
THREADS = 80  # OPTIMIZED for TRUE hardcore checking (fewer threads = more thorough)
BATCH_SIZE = 25

# ⏰ EXTREME TIMEOUTS FOR MAXIMUM ACCURACY (18-22 minutes total runtime)
TIMEOUT_CONNECT = 15.0
TIMEOUT_SSL = 12.0
TIMEOUT_READ = 12.0
MAX_PING_MS = 12000

# 🔄 AGGRESSIVE RETRY SYSTEM - MAXIMUM PERSISTENCE
RETRY_COUNT = 7
RETRY_DELAY = 3.0

# 📊 Output limits (ULTRA-STRICT quality control)
LIMITS = {
    "black": 500,
    "white_all": 250,
    "white_sni": 250,
    "white_cidr": 250,
    "protocols": 300,
    "premium": 100
}

# 🤖 MOST AGGRESSIVE THRESHOLDS EVER
FAIL_THRESHOLD = 2
SUCCESS_THRESHOLD = 10  # Must pass 10 checks to be considered good
PING_WEIGHT = 0.6
STABILITY_WEIGHT = 0.4

# 📡 Telegram Notifications
TG_BOT_TOKEN = "8645441777:AAH7kWlfGqIEggu6SuhgtHCcd0ifNtiSz50"
TG_CHAT_ID = "-1003884045475"
