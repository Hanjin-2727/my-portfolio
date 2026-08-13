# 📌 Git & GitHub 핵심 명령어 및 주요 옵션 종합 가이드

Git 기본 명령어뿐만 아니라 **GitHub 원격 저장소 연동 및 GitHub CLI (`gh`) 전용 명령어**까지 포함된 실전 종합 가이드입니다.

---

## 1. ⚙️ 사용자 및 환경 설정 (Config)

| 명령어 | 옵션 / 설명 |
| :--- | :--- |
| `git config --global user.name "이름"` | Git 커밋에 표시될 작성자 이름 설정 |
| `git config --global user.email "이메일"` | Git 커밋에 표시될 작성자 이메일 설정 |
| `git config --global credential.helper store` | 로그인 토큰/비밀번호를 저장하여 재입력 방지 |
| `git config --list` | 현재 설정된 전체 Git 옵션 목록 확인 |

---

## 2. 📂 저장소 생성 및 상태 확인 (Init, Status, Log)

```bash
# 새로운 Git 저장소 초기화
git init

# GitHub 원격 저장소 프로젝트 복사해 오기
git clone <저장소_URL>

# 현재 변경된 파일들의 상태 확인 (수정됨, 추적 안 됨 등)
git status

# 커밋 기록 보기
git log

# 커밋 기록을 한 줄로 깔끔하게 보기
git log --oneline

# 브랜치 그래프 형태로 커밋 기록 보기
git log --oneline --graph --all
```

---

## 3. 📝 스테이징 및 커밋 (Add & Commit)

### `git add` (변경 사항 올리기)
* `git add <파일명>` : 특정 파일만 스테이징 영역에 추가
* `git add .` : 변경되거나 새로 생성된 **모든 파일**을 스테이징 영역에 추가

### `git commit` (버전 기록 생성)
* `git commit -m "커밋 메시지"`
  * **`-m` (message)**: 커밋 메시지를 에디터 없이 한 줄로 작성
* `git commit -am "커밋 메시지"`
  * **`-a` (all)**: 추적 중인 변경된 파일들을 `git add`와 동시에 커밋
* `git commit --amend`
  * 마지막으로 작성한 커밋 메시지나 내용을 수정

---

## 4. 🌐 GitHub 원격 저장소 연동 (Remote, Push, Pull)

### `git remote` (GitHub 연결 관리)
* `git remote -v` : 연결된 GitHub 저장소 목록 및 주소 확인 (`-v`: verbose)
* `git remote add origin <GitHub_URL>` : GitHub 저장소 주소를 `origin` 이름으로 등록
* `git remote set-url origin <GitHub_URL>` : 등록된 GitHub 저장소 주소를 새로운 주소로 수정/변경
* `git remote remove <이름>` : 기존에 연결된 원격 저장소 삭제

### `git push` (내 컴퓨터 -> GitHub로 업로드)
* `git push origin main` : `origin` (GitHub)의 `main` 브랜치로 파일 업로드
* `git push -u origin main`
  * **`-u` (set-upstream)**: 최초 1회 실행 후, 다음부터는 `git push`만 입력해도 자동 업로드
* `git push --force` (또는 `-f`)
  * **`--force`**: GitHub 저장소를 내 컴퓨터 상태로 강제 덮어쓰기

### `git pull` & `git fetch` (GitHub -> 내 컴퓨터로 다운로드)
* `git pull origin main` : GitHub의 최신 변경 내용을 다운로드받아 현재 코드와 합침(Merge)
* `git pull origin main --allow-unrelated-histories` : 서로 완전히 다른 이력을 가진 GitHub 저장소와 합칠 때 사용
* `git fetch` : GitHub의 변경 내역만 확인하고 코드 합치기는 하지 않음

---

## 5. 🌿 브랜치 관리 (Branch & Switch/Checkout)

```bash
# 현재 존재하는 브랜치 목록 확인
git branch

# 새 브랜치 생성
git branch <새_브랜치명>

# 브랜치 이름 강제 변경 (GitHub 표준 브랜치 이름인 main으로 변경 시)
git branch -M main   # -M : Force Move/Rename

# 브랜치 삭제
git branch -d <브랜치명>   # -d : Delete

# 다른 브랜치로 이동
git switch <브랜치명>
# (구버전) git checkout <브랜치명>

# 브랜치 생성과 동시에 이동
git switch -c <새_브랜치명>   # -c : Create
# (구버전) git checkout -b <새_브랜치명>

# 다른 브랜치의 변경 내용을 현재 브랜치로 합치기
git merge <합칠_브랜치명>
```

---

## 6. 🐙 GitHub 도구 및 CLI (`gh`) 전용 명령어

GitHub 웹사이트를 방문하지 않고 터미널에서 직접 GitHub 기능(저장소 생성, PR, 로그인 등)을 제어할 때 쓰입니다.

```bash
# 1) GitHub 로그인 및 인증
gh auth login

# 2) 터미널에서 바로 새 GitHub 저장소(Repository) 생성
gh repo create my-project --public --source=. --remote=origin

# 3) GitHub 저장소 웹 페이지를 브라우저로 바로 열기
gh repo view --web

# 4) Pull Request (PR) 생성하기
gh pr create --title "새 기능 추가" --body "로그인 기능 구현 완료"

# 5) 이슈(Issue) 목록 조회하기
gh issue list
```

---

## 7. ⏪ 취소 및 되돌리기 (Restore, Reset, Stash)

| 명령어 | 설명 |
| :--- | :--- |
| `git restore <파일명>` | 최근 커밋 상태로 파일을 되돌림 (작업 취소) |
| `git restore --staged <파일명>` | `git add` 한 스테이징 상태를 취소 |
| `git reset HEAD~1` | 최근 1개 커밋을 취소 (작업했던 코드 파일은 그대로 유지) |
| `git reset --hard HEAD~1` | 최근 1개 커밋 및 코드 수정 내역까지 **완전 삭제** |
| `git stash` | 현재 작업 중인 임시 변경 사항을 스태시에 임시 저장 |
| `git stash pop` | 임시 저장했던 변경 사항을 다시 불러옴 |

---

## 💡 실전 자주 쓰는 3단계 필수 수순

### 1) 매일 작업 완료 후 GitHub에 올릴 때
```bash
git add .
git commit -m "feat: 새로운 기능 구현 완료"
git push
```

### 2) 작업 시작 전 GitHub의 최신 코드 받아올 때
```bash
git pull
```
