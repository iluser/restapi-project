import express from 'express';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const router = express.Router();

async function quote(input) {
    try {
        const res = await fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1');
        const text = await res.text();
        const $ = cheerio.load(text);
        let data = [];
        $('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
            let x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim();
            let y = $(this).find('span[class="auteur-beschrijving"]').text().trim();
            let z = $(element).find('q[class="fbquote"]').text().trim();
            data.push({ author: x, bio: y, quote: z });
        });
        data.splice(2, 1);
        if (data.length == 0) return { status: false };
        return { status: true, data };
    } catch (error) {
        throw error;
    }
}

router.get('/', async (req, res) => {
    try {
        const { input } = req.query;
        const result = await quote(input);
        res.json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
