# 3B Autos Website (Starter)

Static HTML/CSS/JavaScript website for 3B Autos, Doha, Qatar.

## Files
- `index.html` — website structure and content
- `style.css` — responsive styling
- `script.js` — demo parts catalog, search/filter, and WhatsApp inquiry logic

## Before publishing
1. Open `script.js` and set `WHATSAPP_NUMBER` to the real WhatsApp number in international format, digits only (for Qatar, usually starts with `974`).
2. Replace the sample product listings, illustrative prices, and demo images with real inventory and photos.
3. Verify all service-price estimates with the business before publishing them as official rates.
4. Verify the exact address/map pin and add real phone number, opening hours, and social links.

## Deploy on Vercel
1. Upload all files to the root of a GitHub repository.
2. In Vercel, import that repository.
3. Select **Other** as the framework preset. Leave the build command empty and use `.` as the output directory if asked.
4. Deploy.

## Limitations of this starter
This is a static front-end. The inquiry form opens WhatsApp and does not save submissions to a database. Product data is hard-coded in `script.js`; an admin dashboard, database, authentication, and real uploads need to be added separately.
