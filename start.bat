@echo off
chcp 65001 > nul
title 박장우 개인 웹사이트 실행기

echo ===================================================================
echo   박장우 개인 웹사이트(PARK JANG WOO Portfolio)를 시작합니다.
echo ===================================================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [안내] Python 로컬 서버를 통해 브라우저를 실행합니다...
    python run_server.py
) else (
    echo [안내] 기본 웹 브라우저로 index.html 파일을 직접 엽니다...
    start index.html
)

pause

