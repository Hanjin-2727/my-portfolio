#!/usr/bin/env bash
set -e
cd /home/tomkim/my-portfolio/pj03

echo "=================================================="
echo "🚀 pj03 (LCM 우리단지 ON) Vercel 배포 시작..."
echo "=================================================="

# pj03 독립 배포 실행
DEPLOY_OUTPUT=$(npx -y vercel --prod --yes)
echo "$DEPLOY_OUTPUT"

# URL 추출 (https://...vercel.app)
LIVE_URL=$(echo "$DEPLOY_OUTPUT" | grep -o 'https://[a-zA-Z0-9_-]*\.vercel\.app' | tail -n 1)

if [ -n "$LIVE_URL" ]; then
    echo "=================================================="
    echo "🔗 도메인 별칭 연결 중: tomkim-lcm-community.vercel.app"
    echo "=================================================="
    npx -y vercel alias set "$LIVE_URL" "tomkim-lcm-community.vercel.app" || true
    echo "=================================================="
    echo "✅ 배포 및 맞춤 도메인 설정이 완료되었습니다!"
    echo "👉 https://tomkim-lcm-community.vercel.app"
    echo "=================================================="
else
    echo "도메인 추가 중..."
    npx -y vercel domains add tomkim-lcm-community.vercel.app || true
fi
