const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fetch = require('node-fetch'); // For making API calls

// Define a schema for brand logos
const brandLogoSchema = new mongoose.Schema({
  brand_name: String,
  logo_url: String,
});

// Create a model for the brand_logos collection
const BrandLogo = mongoose.model('BrandLogo', brandLogoSchema, 'brand_logos');

// GET all brand logos
router.get('/', async (req, res) => {
  try {
    const logos = await BrandLogo.find({}, { _id: 0 });
    res.json(logos);
  } catch (err) {
    console.error('Error fetching brand logos:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET logo for a specific brand
router.get('/:brand', async (req, res) => {
  const { brand } = req.params;

  try {
    // Normalize the brand name
    const normalizedBrand = brand.toLowerCase().trim();

    // Check if the logo exists in the database
    let logoDoc = await BrandLogo.findOne({ brand_name: normalizedBrand }, { _id: 0 });

    if (!logoDoc) {
      // Fetch the logo from the external API
      const response = await fetch(`https://api.logo.dev/search?q=${encodeURIComponent(normalizedBrand)}`, {
        headers: {
          Authorization: `Bearer sk_UKTIO6n-Qs-8x2-bava-Nw`,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Use the first logo URL from the API response
      const logoUrl = data.length > 0 ? data[0].logo_url : 'https://via.placeholder.com/30x30';

      // Store the logo in the database
      logoDoc = { brand_name: normalizedBrand, logo_url: logoUrl };
      await BrandLogo.create(logoDoc);
    }

    res.json(logoDoc);
  } catch (err) {
    console.error(`Error fetching logo for ${brand}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;