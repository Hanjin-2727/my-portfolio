# 📌 Git 핵심 명령어 & 주요 옵션 가이드 (Git Cheat Sheet)

Git 사용 시 가장 자주 쓰이는 핵심 명령어와 옵션들을 정리한 실전 가이드입니다.

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

# 원격 저장소 프로젝트 복사해 오기
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

## 4. 🌐 원격 저장소 연동 및 동기화 (Remote, Push, Pull)

### `git remote` (원격 저장소 관리)
* `git remote -v` : 연결된 원격 저장소 목록 및 주소 확인 (`-v`: verbose)
* `git remote add origin <URL>` : `origin`이라는 이름으로 원격 저장소 주소 등록
* `git remote set-url origin <URL>` : 기존 등록된 원격 저장소 주소를 새로운 주소로 변경

### `git push` (내 컴퓨터 -> 서버로 업로드)
* `git push origin main` : `origin` 원격 저장소의 `main` 브랜치로 업로드
* `git push -u origin main`
  * **`-u` (set-upstream)**: 최초 1회 실행 후, 다음부터는 `git push`만 입력해도 자동 연동
* `git push --force` (또는 `-f`)
  * **`--force`**: 강제로 원격 저장소 덮어쓰기 *(주의해서 사용)*

### `git pull` & `git fetch` (서버 -> 내 컴퓨터로 다운로드)
* `git pull origin main` : 원격 저장소의 변경 내용을 다운로드받아 현재 코드와 합침(Merge)
* `git fetch` : 원격 저장소의 변경 내역만 확인하고 자동 합치기는 하지 않음

---

## 5. 🌿 브랜치 관리 (Branch & Switch/Checkout)

```bash
# 현재 존재하는 브랜치 목록 확인
git branch

# 새 브랜치 생성
git branch <새_브랜치명>

# 브랜치 이름 강제 변경 (예: master -> main)
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

## 6. ⏪ 취소 및 되돌리기 (Restore, Reset, Stash)

| 명령어 | 설명 |
| :--- | :--- |
| `git restore <파일명>` | 최근 커밋 상태로 파일을 되돌림 (작업 취소) |
| `git restore --staged <파일명>` | `git add` 한 스테이징 상태를 취소 |
| `git reset HEAD~1` | 최근 1개 커밋을 취소 (작업했던 코드 파일은 그대로 유지) |
| `git reset --hard HEAD~1` | 최근 1개 커밋 및 코드 수정 내역까지 **완전 삭제** |
| `git stash` | 현재 작업 중인 임시 변경 사항을 스태시에 임시 저장 |
| `git stash pop` | 임시 저장했던 변경 사항을 다시 불러옴 |

---

## 💡 실전 자주 쓰는 명령어 3단계 순서

### 1) 매일 작업 후 배포할 때
```bash
git add .
git commit -m "feat: 로그인 기능 구현 완료"
git push
```

### 2) 작업 전 최신 코드 받아올 때
```bash
git pull
```
