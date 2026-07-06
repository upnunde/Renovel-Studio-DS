# DS 릴리스 가이드

upnunde-test 앱에 DS 변경을 반영하려면 **시맨틱 태그**(`v0.1.9` 형식)가 필요합니다.

## 1. 버전 올리기

`package.json`의 `version`을 새 버전으로 수정합니다.

## 2. 태그 푸시

```bash
git tag v0.1.9
git push origin v0.1.9
```

태그 푸시 시 `notify-upnunde-test` 워크플로가 upnunde-test에 동기화 신호를 보냅니다.

## 3. (선택) GitHub Release publish

Release notes가 필요하면 GitHub에서 Release를 publish해도 동일하게 동작합니다.

## upnunde-test 쪽 결과

- `ds-sync` 워크플로 실행
- `design-system` 버전 업데이트 PR 자동 생성
- PR 머지 후 앱에 반영

## 사전 설정 (1회)

DS repo Secret `UPNUNDE_TEST_DISPATCH_PAT` — upnunde-test `repository_dispatch` 권한 PAT
