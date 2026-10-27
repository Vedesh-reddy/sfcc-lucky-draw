# Contributing

Start from `main` and create a focused `feature/`, `fix/`, or `docs/` branch. Keep behavior changes and documentation accurate together.

```sh
npm ci
npm run validate
npm run package:metadata
```

CI mocks cannot check platform quotas, real e-mail delivery, payment processors, Business Manager permissions, multipart uploads or metadata installation. For a platform behavior change, exercise the affected feature on a sandbox, following the sandbox verification plan in [docs/TESTING.md](docs/TESTING.md). In the PR, say which checks were automated and which were manual.

Preserve these rules:

- a campaign's rules freeze when it is scheduled; draws use only the committed seed and the frozen entry snapshot;
- the `plugin-luckydraw.hmac` secret is set once and never changed (entry deduplication and coupon lookups depend on it);
- no campaign can be scheduled on production until `luckyDrawLegalApproved` is set after legal sign-off;
- a custom object query uses at most 4 custom attribute expressions (the test harness enforces it);
- every storefront post and desk action validates CSRF.

Keep credentials and generated output out of Git. Add new attributes to the metadata and to [docs/METADATA.md](docs/METADATA.md), and new text to the resource bundle.

See [NOTICE.md](NOTICE.md) for attribution and terms.
