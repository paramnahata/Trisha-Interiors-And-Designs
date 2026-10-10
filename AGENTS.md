<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Site architecture
- Keep studio contact and social destinations in `src/lib/business.ts` so every placement uses the same source.
- Share scroll reveals, image parallax, and section-line animation in `src/components/site/Reveal.tsx`, respecting reduced-motion preferences so movement remains consistent and accessible.
