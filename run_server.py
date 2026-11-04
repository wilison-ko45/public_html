#!/usr/bin/env python3
"""
박장우 개인 웹사이트 로컬 개발/미리보기 서버 (run_server.py)
Python 표준 라이브러리(http.server, webbrowser)를 사용하여
추가 패키지 설치 없이 즉시 브라우저에서 웹사이트를 실행합니다.
"""

import os
import sys
import webbrowser
import http.server
import socketserver

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # 정돈된 콘솔 로깅
        sys.stdout.write(f"[{self.log_date_time_string()}] {format % args}\n")

def main():
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 65)
        print(f"  박장우 개인 웹사이트 로컬 서버가 시작되었습니다.")
        print(f"  - 웹사이트 접속 주소: {url}")
        print(f"  - 서비스 루트 경로: {DIRECTORY}")
        print("  - 종료하려면 터미널에서 Ctrl + C 를 누르세요.")
        print("=" * 65)
        
        # 기본 브라우저 자동 실행
        webbrowser.open(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버를 안전하게 종료했습니다.")

if __name__ == "__main__":
    main()

