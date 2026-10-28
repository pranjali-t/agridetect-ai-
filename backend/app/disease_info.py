"""
backend/app/disease_info.py

Agronomic and pathological reference data for the 25 plant disease classes.
Descriptions and cultural practices are sourced from standard agricultural extension
references (e.g., UC IPM, Cornell Extension, USDA ARS, and FAO IPM guidelines).

NOTE: In accordance with academic guidelines, this module provides non-prescriptive
cultural and preventive advisories only. No chemical dosages or fabricated severity
estimates are generated.
"""

from typing import Dict, Any

DISEASE_KNOWLEDGE_BASE: Dict[str, Dict[str, Any]] = {
    # ---------------- Apple Classes ----------------
    "Apple___Apple_scab": {
        "crop": "Apple",
        "scientific_name": "Malus domestica",
        "disease": "Apple Scab",
        "is_healthy": False,
        "causal_agent": "Venturia inaequalis (Fungus)",
        "symptoms": (
            "Dull olive-green to velvety dark brown circular lesions on leaves, often with fuzzy margins. "
            "Infected leaves may turn chlorotic, curl, and suffer premature summer defoliation."
        ),
        "advisory": (
            "Rake and shred or compost fallen leaves in late autumn to reduce overwintering pseudothecia inoculum. "
            "Prune tree canopies during dormancy to optimize sunlight penetration and rapid air drying of foliage."
        ),
    },
    "Apple___Black_rot": {
        "crop": "Apple",
        "scientific_name": "Malus domestica",
        "disease": "Black Rot (Frog-Eye Leaf Spot)",
        "is_healthy": False,
        "causal_agent": "Botryosphaeria obtusa (Fungus)",
        "symptoms": (
            "Small purple foliar flecks that expand into circular lesions with light tan centers and distinct "
            "dark purple margins, forming a characteristic 'frog-eye' pattern."
        ),
        "advisory": (
            "Prune out dead wood, cankered branches, and remove mummified fruits from the tree canopy and orchard floor. "
            "Maintain overall orchard vigor through balanced soil nutrition and weed management."
        ),
    },
    "Apple___Cedar_apple_rust": {
        "crop": "Apple",
        "scientific_name": "Malus domestica",
        "disease": "Cedar Apple Rust",
        "is_healthy": False,
        "causal_agent": "Gymnosporangium juniperi-virginianae (Heteroecious Rust Fungus)",
        "symptoms": (
            "Bright orange-yellow circular spots on upper leaf surfaces appearing in spring. Later in summer, "
            "small raised pustules form on the underside of leaves with cylindrical aecial tubes."
        ),
        "advisory": (
            "Eliminate nearby alternate host red cedar (Juniperus virginiana) trees within a 1-2 mile radius where feasible. "
            "Consider planting rust-resistant apple cultivars (e.g., Liberty, Freedom, Enterprise)."
        ),
    },
    "Apple___healthy": {
        "crop": "Apple",
        "scientific_name": "Malus domestica",
        "disease": "Healthy Foliage",
        "is_healthy": True,
        "causal_agent": "None (Healthy tissue)",
        "symptoms": (
            "Uniform green leaf pigmentation, intact serrated leaf margins, smooth cuticle, and absence of necrotic or chlorotic lesions."
        ),
        "advisory": (
            "Continue routine orchard scouting, balanced irrigation, and integrated pest management (IPM) practices to preserve canopy health."
        ),
    },

    # ---------------- Corn (Maize) Classes ----------------
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
        "crop": "Corn (Maize)",
        "scientific_name": "Zea mays",
        "disease": "Gray Leaf Spot (Cercospora Leaf Spot)",
        "is_healthy": False,
        "causal_agent": "Cercospora zeae-maydis (Fungus)",
        "symptoms": (
            "Small chlorotic spots that elongate into narrow rectangular tan lesions strictly delimited by leaf veins. "
            "Severe infections coalesce to blight entire leaf blades, impairing grain fill."
        ),
        "advisory": (
            "Practice multi-year crop rotation with non-grass host crops (e.g., soybean). Incorporate infected crop residue "
            "through conservation tillage where appropriate, and select resistant corn hybrids."
        ),
    },
    "Corn_(maize)___Common_rust_": {
        "crop": "Corn (Maize)",
        "scientific_name": "Zea mays",
        "disease": "Common Rust",
        "is_healthy": False,
        "causal_agent": "Puccinia sorghi (Fungus)",
        "symptoms": (
            "Golden-brown to cinnamon-colored powdery rust pustules (uredinia) scattered across both upper and lower leaf surfaces. "
            "Pustules rupture the epidermis to release powdery airborne spores."
        ),
        "advisory": (
            "Plant resistant commercial hybrids containing Rp-gene resistance. Avoid excessive nitrogen applications and monitor fields "
            "closely during periods of cool, high-humidity weather (60-77°F)."
        ),
    },
    "Corn_(maize)___Northern_Leaf_Blight": {
        "crop": "Corn (Maize)",
        "scientific_name": "Zea mays",
        "disease": "Northern Corn Leaf Blight",
        "is_healthy": False,
        "causal_agent": "Exserohilum turcicum (Fungus)",
        "symptoms": (
            "Distinctive long, elliptical, cigar-shaped grayish-green to tan lesions (1 to 6 inches long) that develop on lower leaves "
            "and progress upward through the canopy."
        ),
        "advisory": (
            "Deploy resistant hybrid seed varieties (with Ht genes). Practice 1- to 2-year rotation out of corn, and manage debris from "
            "previous harvests where no-till is practiced."
        ),
    },
    "Corn_(maize)___healthy": {
        "crop": "Corn (Maize)",
        "scientific_name": "Zea mays",
        "disease": "Healthy Foliage",
        "is_healthy": True,
        "causal_agent": "None (Healthy tissue)",
        "symptoms": (
            "Broad, dark green foliage with distinct parallel venation, crisp leaf borders, and no pustules, blights, or mottling."
        ),
        "advisory": (
            "Maintain optimal soil nitrogen and phosphorus levels, practice conservation tillage, and conduct weekly field walks during vegetative growth."
        ),
    },

    # ---------------- Grape Classes ----------------
    "Grape___Black_rot": {
        "crop": "Grape",
        "scientific_name": "Vitis vinifera",
        "disease": "Black Rot",
        "is_healthy": False,
        "causal_agent": "Guignardia bidwellii (Fungus)",
        "symptoms": (
            "Small circular reddish-brown leaf spots with tiny black pycnidia specks arranged in a ring near lesion margins. "
            "Can cause shriveling and mummification of fruit clusters."
        ),
        "advisory": (
            "Remove and destroy all mummified fruit clusters during dormant winter pruning. Position shoots and manage vine canopy "
            "to maximize solar exposure and reduce leaf wetness duration."
        ),
    },
    "Grape___Esca_(Black_Measles)": {
        "crop": "Grape",
        "scientific_name": "Vitis vinifera",
        "disease": "Esca (Black Measles / Trunk Disease)",
        "is_healthy": False,
        "causal_agent": "Phaeomoniella chlamydospora & fungal wood-inhabiting complex",
        "symptoms": (
            "Interveinal yellowing (chlorosis) followed by necrotic drying between veins producing a characteristic 'tiger-stripe' pattern on leaves. "
            "Dark purple spots ('measles') may appear on ripening berry skins."
        ),
        "advisory": (
            "Disinfect pruning shears regularly with 70% isopropyl alcohol. Avoid large pruning cuts during wet periods, and protect pruning wounds "
            "with biological or physical wound sealants."
        ),
    },
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "crop": "Grape",
        "scientific_name": "Vitis vinifera",
        "disease": "Leaf Blight (Isariopsis Leaf Spot)",
        "is_healthy": False,
        "causal_agent": "Pseudocercospora vitis (Fungus)",
        "symptoms": (
            "Irregular, angular dark brown to black necrotic patches across the leaf surface, frequently surrounded by faint chlorotic halos. "
            "Severe cases lead to premature post-veraison defoliation."
        ),
        "advisory": (
            "Ensure adequate trellis spacing and summer shoot hedging to promote thorough air drainage through the grapevine fruit zone. "
            "Clean and till dropped leaves into the soil after harvest."
        ),
    },
    "Grape___healthy": {
        "crop": "Grape",
        "scientific_name": "Vitis vinifera",
        "disease": "Healthy Foliage",
        "is_healthy": True,
        "causal_agent": "None (Healthy tissue)",
        "symptoms": (
            "Well-formed palmate lobed leaves with vibrant green chlorophyll distribution, distinct main veins, and clean margins."
        ),
        "advisory": (
            "Maintain trellis shoot training, balanced deficit irrigation (RDI) for wine grapes, and seasonal integrated pest monitoring."
        ),
    },

    # ---------------- Potato Classes ----------------
    "Potato___Early_blight": {
        "crop": "Potato",
        "scientific_name": "Solanum tuberosum",
        "disease": "Early Blight",
        "is_healthy": False,
        "causal_agent": "Alternaria solani (Fungus)",
        "symptoms": (
            "Dark brown to black necrotic spots with concentric target-board rings on mature lower leaves, often surrounded by chlorotic yellow halos. "
            "Lesions expand and cause leaf senescence."
        ),
        "advisory": (
            "Avoid overhead sprinkler irrigation to keep leaf canopies dry; switch to drip lines where feasible. "
            "Ensure adequate nitrogen and potassium fertility, and rotate fields out of solanaceous crops for at least 2-3 years."
        ),
    },
    "Potato___Late_blight": {
        "crop": "Potato",
        "scientific_name": "Solanum tuberosum",
        "disease": "Late Blight",
        "is_healthy": False,
        "causal_agent": "Phytophthora infestans (Oomycete)",
        "symptoms": (
            "Rapidly expanding water-soaked, dark green to purplish-black lesions that turn brown and necrotic. "
            "Under humid morning conditions, a delicate white fuzzy fungal growth appears on lesion undersides."
        ),
        "advisory": (
            "Plant only certified disease-free seed tubers. Eliminate all volunteer potato plants and cull piles in early spring. "
            "Destroy and bury severely infected vine foliage immediately to protect underground tubers."
        ),
    },
    "Potato___healthy": {
        "crop": "Potato",
        "scientific_name": "Solanum tuberosum",
        "disease": "Healthy Foliage",
        "is_healthy": True,
        "causal_agent": "None (Healthy tissue)",
        "symptoms": (
            "Compound pinnate leaves with bright green color, upright petioles, and no blighting, target rings, or water-soaked lesions."
        ),
        "advisory": (
            "Maintain hill height to protect developing tubers from spore wash, implement regular scouting, and monitor weather blight forecasts."
        ),
    },

    # ---------------- Tomato Classes ----------------
    "Tomato___Bacterial_spot": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Bacterial Spot",
        "is_healthy": False,
        "causal_agent": "Xanthomonas perforans / euvesicatoria (Bacterium)",
        "symptoms": (
            "Small (1/8 inch), dark brown to black circular lesions on leaves, often greasy or water-soaked initially, with a yellow halo. "
            "Centers may dry and fall out, giving a shot-hole appearance."
        ),
        "advisory": (
            "Use certified pathogen-free seeds and transplants. Avoid working in tomato rows when plants are wet from dew or rain. "
            "Disinfect stakes and trellises before each growing season."
        ),
    },
    "Tomato___Early_blight": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Early Blight",
        "is_healthy": False,
        "causal_agent": "Alternaria solani (Fungus)",
        "symptoms": (
            "Brown-black spots featuring concentric 'target-like' rings on older leaves first. Foliage yellows around lesions, "
            "causing extensive defoliation from the base of the plant upwards."
        ),
        "advisory": (
            "Mulch heavily around the plant base to prevent rain-splash transmission of soil-borne spores. Prune lower suckers (bottom 12 inches), "
            "and water exclusively at ground level."
        ),
    },
    "Tomato___Late_blight": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Late Blight",
        "is_healthy": False,
        "causal_agent": "Phytophthora infestans (Oomycete)",
        "symptoms": (
            "Large, irregular water-soaked pale-to-dark olive lesions that turn necrotic and papery. White sporulating mold appears on the underside "
            "of leaves in cool, moist conditions."
        ),
        "advisory": (
            "Provide ample spacing between tomato plants for continuous airflow. Remove and bag infected plants at first confirmation. "
            "Do not plant tomatoes in close proximity to potato crops."
        ),
    },
    "Tomato___Leaf_Mold": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Leaf Mold",
        "is_healthy": False,
        "causal_agent": "Passalora fulva (Cladosporium fulvum, Fungus)",
        "symptoms": (
            "Pale yellow spots with indistinct margins on the upper leaf surface; olive-green to brownish velvety mold growth "
            "develops directly beneath the spots on lower leaf surfaces."
        ),
        "advisory": (
            "Primarily a high-tunnel and greenhouse issue: improve ventilation, utilize circulation fans, and avoid humidity above 85%. "
            "Select tomato cultivars with specific Cf resistance genes."
        ),
    },
    "Tomato___Septoria_leaf_spot": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Septoria Leaf Spot",
        "is_healthy": False,
        "causal_agent": "Septoria lycopersici (Fungus)",
        "symptoms": (
            "Numerous small, circular lesions (1/16 to 1/8 inch) with dark brown margins and sunken grayish-white centers dotted with tiny black pycnidia fruiting bodies."
        ),
        "advisory": (
            "Maintain clean seedbeds, rotate away from nightshades for two years, and avoid working amongst wet plants. Destroy crop debris promptly after the final harvest."
        ),
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Spider Mites (Two-Spotted Spider Mite Damage)",
        "is_healthy": False,
        "causal_agent": "Tetranychus urticae (Acari: Tetranychidae)",
        "symptoms": (
            "Fine yellow stippling or bronzing on upper leaf surfaces caused by mite sap-feeding. Fine silky webbing forms on leaf undersides, "
            "with leaves eventually drying and turning brittle."
        ),
        "advisory": (
            "Avoid dusty orchard conditions which favor mite reproduction. Wash leaf undersides with strong water spray where appropriate, "
            "and encourage natural predatory mites (Phytoseiidae) and lady beetles."
        ),
    },
    "Tomato___Target_Spot": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Target Spot",
        "is_healthy": False,
        "causal_agent": "Corynespora cassiicola (Fungus)",
        "symptoms": (
            "Small pinpoint brown necrotic spots that enlarge into circular lesions with light brown centers, dark margins, and concentric zonation rings."
        ),
        "advisory": (
            "Prune canopy foliage to improve air drainage and reduce canopy leaf wetness duration. Avoid excessive nitrogen fertilization, "
            "which causes dense, humid foliage."
        ),
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Tomato Yellow Leaf Curl Virus (TYLCV)",
        "is_healthy": False,
        "causal_agent": "Tomato Yellow Leaf Curl Virus (Begomovirus, Vector: Silverleaf Whitefly)",
        "symptoms": (
            "Severe upward cupping and curling of leaf margins, reduced leaflet size, pronounced chlorotic yellowing, and stunted bushy plant growth."
        ),
        "advisory": (
            "Deploy insect exclusion netting and yellow sticky traps to manage the Bemisia tabaci whitefly vector. "
            "Rogue out and destroy virus-infected plants immediately to prevent vector spread; plant TYLCV-resistant varieties."
        ),
    },
    "Tomato___Tomato_mosaic_virus": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Tomato Mosaic Virus (ToMV)",
        "is_healthy": False,
        "causal_agent": "Tomato Mosaic Virus (Tobamovirus)",
        "symptoms": (
            "Mottling of leaves with alternating light green and dark green mosaic patterns, leaf blistering, strapping ('shoestring' appearance), and overall stunting."
        ),
        "advisory": (
            "Wash hands thoroughly with soap or 20% nonfat dry milk solution before handling plants. Avoid tobacco use around plants, "
            "disinfect tools with trisodium phosphate (TSP), and plant certified virus-free seed."
        ),
    },
    "Tomato___healthy": {
        "crop": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "disease": "Healthy Foliage",
        "is_healthy": True,
        "causal_agent": "None (Healthy tissue)",
        "symptoms": (
            "Deep green serrated compound foliage, firm stems, clear venation, and complete absence of curling, chlorosis, stippling, or necrotic leaf spots."
        ),
        "advisory": (
            "Maintain consistent drip watering to prevent blossom end rot, provide sturdy trellising, and monitor lower canopy weekly for early signs of disease."
        ),
    },
}


def get_disease_details(raw_class_name: str) -> Dict[str, Any]:
    """
    Retrieves botanical, pathological, and agronomic metadata for a raw class label.
    Falls back gracefully to parsed formatting if an unrecognized class is provided.
    """
    if raw_class_name in DISEASE_KNOWLEDGE_BASE:
        return dict(DISEASE_KNOWLEDGE_BASE[raw_class_name])

    # Fallback parser for arbitrary "Crop___Disease" strings
    parts = raw_class_name.split("___")
    crop_raw = parts[0].replace("_", " ").replace("(maize)", "").strip().title()
    disease_raw = parts[1].replace("_", " ").strip() if len(parts) > 1 else "Unknown Condition"

    is_healthy = "healthy" in disease_raw.lower()

    return {
        "crop": crop_raw,
        "scientific_name": "",
        "disease": "Healthy Foliage" if is_healthy else disease_raw.title(),
        "is_healthy": is_healthy,
        "causal_agent": "None (Healthy tissue)" if is_healthy else "Pathogen under evaluation",
        "symptoms": "Detailed foliar symptoms not cataloged for this specific class index.",
        "advisory": "Follow standard agricultural hygiene and consult your regional agricultural extension service.",
    }
