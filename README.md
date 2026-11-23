# Owen Ball — The Screening Library

A complete static portfolio for GitHub Pages: four film and sound projects, individual project stories, a thirteen-image photography gallery, and a personal introduction.

## Open the website

Open `index.html` in a browser for a quick preview. An internet connection is needed for the Vimeo players and Google Fonts. The site has system-font fallbacks, and photographs are included locally. A hosted preview gives the most accurate video behavior.

## Publish with GitHub Pages

1. Sign in at [GitHub](https://github.com). Create a new repository, for example `portfolio`. Choose **Public** if using GitHub Free. You can initialize it with a README.
2. Unzip `owen-ball-portfolio.zip` on your computer. Open the extracted folder.
3. In the repository, choose **Add file → Upload files**. Drag the extracted contents into the upload area, including the whole `assets` folder. Upload the files inside the ZIP, not the ZIP itself or an extra enclosing folder.
4. Confirm that `index.html`, `photography.html`, the four project HTML files, and `assets/` appear directly at the repository’s top level. Commit the upload. The included `.nojekyll` file can also be uploaded if your computer shows hidden files; the site does not depend on it.
5. Open the repository’s **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**. Select **main** and **/(root)**, then choose **Save**.
7. Wait for the Pages deployment to finish. Return to **Settings → Pages** and open the published address shown there. For a repository called `portfolio`, it will normally look like `https://YOUR-USERNAME.github.io/portfolio/`.
8. Visit the live site on a phone and computer. Open each film and photograph and try the contact link.

The publishing steps follow [GitHub’s publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Your site is prepared for publication; creating these files does not publish it.

## What is in the folder?

| File or folder | What it controls |
| --- | --- |
| `index.html` | Film library, opening introduction, About copy, and photography link |
| `scla.html` | SCLA anniversary film and your storytelling decisions |
| `kings-academy.html` | The King’s Academy film and VFX discussion |
| `grace-chapel.html` | Grace Chapel film and your coverage reflection |
| `toy-story-adr.html` | Class ADR assignment, Foley, dialogue recording, studio photo, and final-mix reflection |
| `photography.html` | Thirteen photographs and the full-image viewer |
| `assets/style.css` | Shared colors, typography, spacing, and mobile layouts |
| `assets/site.js` | Film selection, preview controls, viewing dialogs, photo navigation |
| `assets/images/` | Your professional headshot, on-location photo, film preview images, and favicon |
| `assets/photos/` | Gallery photographs and smaller display versions |

No installation, build command, server, or API key is required to publish.

## Change text

On GitHub, open the HTML file you want to change and choose the pencil icon. Find the wording, edit only the text between the HTML tags, and commit the change. GitHub Pages will publish the update.

The portfolio copy has been professionally edited at Owen’s request, preserving the meaning and key phrases from his introduction, project explanations, and reflections. Do not add unsupported experience, results, skills, or affiliations when revising it further.

Toy Story ADR is a class assignment using an existing film scene. Owen’s contribution is Foley, recording the vocal performances, and the final mix. Its Netflix-based loudness target is assignment context, not Netflix approval or a claim that the project was commissioned by Netflix. Voice performance and original animation are not credited to Owen.

## Replace your opening photo

The main profile uses `assets/images/owen-ball-headshot.jpg`. Replace that JPG using exactly the same filename to update the professional portrait. The on-location camera photo appears beside the About section and is stored as `assets/images/owen-ball.jpg`. A vertical image works best for either. Your original files are untouched; the included copies are optimized for the website.

## Update films

The supplied Vimeo management links have been replaced with public player links and their unlisted-video hashes:

| Film | Video ID | Hash |
| --- | --- | --- |
| SCLA | `1201639268` | `f3a242fcdb` |
| The King’s Academy | `1181231760` | `d22eb10714` |
| Grace Chapel | `1246692752` | `9cd34ef576` |
| Toy Story ADR | `1249445028` | `ac8affdb30` |

To replace a film:

1. In `index.html`, find its `film-choice` button. Update its `data-id`, `data-hash`, title, duration, category, and associated project-page path if necessary.
2. In its project HTML file, replace the Vimeo iframe’s URL and the **Watch on Vimeo** link. Keep the `h=` hash when Vimeo provides one.
3. Replace the corresponding local preview image in `assets/images/` if needed. These images were retrieved from your actual Vimeo players. Grace Chapel’s black thumbnail was replaced with a frame from Vimeo’s own preview sheet (approximately 29 seconds into that film).
4. If changing the first/default film, also update the opening stage’s static title, image, category, duration, project link, status line, and no-JavaScript links in `index.html`.

Vimeo’s privacy settings must allow the film to be embedded on your published domain. All four player pages were accessible during preparation. If an embed stops working, check the video’s viewing and embed privacy settings in Vimeo, then test again at the final GitHub Pages address. A 200 response alone is not a guarantee of future playback or permission on every domain.

Motion previews are muted, looping Vimeo players. Visitors can pause them. They are disabled by default when the visitor requests reduced motion, and stop while a film dialog is open or the page is hidden. Full films use visible Vimeo controls and start when the visitor chooses **Watch film**. Autoplay can be restricted by browser or device settings; the local preview image and project links remain available.

If you later make dedicated short previews, you can replace the ambient embeds in `assets/site.js` with local `<video muted loop playsinline>` elements and an appropriate poster. Keep a pause control and respect reduced-motion settings.

## Add or replace photographs

All thirteen submitted photos are included. Originals are untouched. The site uses resized JPGs with embedded camera/location metadata removed. Large copies are limited to a 2,200-pixel longest side; `-small.jpg` copies are limited to 900 pixels.

To replace a photo, upload a new file with the same filename in `assets/photos/`, replacing both the large and `-small` versions. To add a photo, copy a complete `<figure>` in `photography.html`, change the filenames and descriptive `alt` text, then update the gallery’s count. The full-image viewer discovers photos automatically. Use `portrait` for a vertical frame and `wide` for a full-width landscape. Keep alternative text factual and useful.

The gallery opens photos without cropping. Visitors can use Previous/Next, the keyboard arrow keys, and Escape to close. Without JavaScript, each photograph links directly to its larger image.

## Contact and optional additions

Contact links open an email to `owen@cscopestudios.com`. There is no contact form or backend to configure. To change the email, update each HTML file.

Résumé, social profiles, photography captions, extra process images, and additional projects were not supplied, so no empty sections were added. Add them when ready. For improved video accessibility, add or review captions in Vimeo and provide a transcript alongside each project as available. No transcript or caption availability was assumed or fabricated.

## Accessibility and maintenance

The site includes a skip link, semantic headings, visible keyboard focus, descriptive image text, native dialogs with keyboard closing and focus return, responsive layouts, reduced-motion support, and non-JavaScript project/photo links. External fonts fall back to local fonts. Gallery images load responsively, with later images loaded as needed.

Keep all file paths relative (for example `assets/photos/example.jpg`, not `/assets/photos/example.jpg`) so the site works under a repository subdirectory. Do not rename files without updating their links. There are no tracking scripts added by this website; Vimeo and Google Fonts make external requests. Vimeo embeds use its `dnt` parameter.
