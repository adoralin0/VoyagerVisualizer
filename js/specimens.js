/**
 * Department specimens from the Skeletal Growth Database.
 * Models and part metadata: https://github.com/digitalworlds/SkeletalGrowthDB
 * The Unity viewer that already loads these files: https://github.com/digitalworlds/OsteologyViewer
 * The current osteology site: https://github.com/digitalworlds/skeletal-growth-website
 *
 * Sex, locality, and scanner settings are left blank when the database record
 * does not publish them. Part names and colors come from each model's JSON
 * and ColorDictionary.json.
 */

export const specimens = [
  {
    "id": "dwa-aotus1",
    "modelName": "DWA-Aotus1_Taxon",
    "description": "Skull of adult Aotus nancymaae (DWA-Aotus1)",
    "scientific": "Aotus nancymaae",
    "common": "Nancy Ma's night monkey",
    "family": "Aotidae",
    "subfamily": "Aotinae",
    "infraorder": "Platyrrhini",
    "suborder": "Haplorrhini",
    "traits": [
      "Platyrrhine",
      "Enlarged orbits",
      "Teeth model"
    ],
    "catalog": "DWA-Aotus1",
    "age": "Adult",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/",
    "model": "DWA-Aotus1_Taxon.glb",
    "orientation": [
      0,
      0,
      0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": null,
    "teeth": {
      "modelName": "DWA-Aotus1_Teeth",
      "model": "DWA-Aotus1_Teeth.glb",
      "partCount": 58,
      "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/DWA-Aotus1_Teeth.glb"
    },
    "badges": [
      "Taxon",
      "Adult",
      "Teeth"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/DWA-Aotus1_Taxon.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/AotusModels/DWA-Aotus1_Taxon.json",
    "placeholder": false
  },
  {
    "id": "aotus107",
    "modelName": "Aotus107_Taxon_v3",
    "description": "Skull of juvenile Aotus (Aotus107)",
    "scientific": "Aotus nancymaae",
    "common": "Nancy Ma's night monkey",
    "family": "Aotidae",
    "subfamily": "Aotinae",
    "infraorder": "Platyrrhini",
    "suborder": "Haplorrhini",
    "traits": [
      "Platyrrhine",
      "Enlarged orbits",
      "Segmented bones",
      "Teeth model"
    ],
    "catalog": "Aotus107",
    "age": "Juvenile",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/",
    "model": "Aotus107_Taxon_v3.glb",
    "orientation": [
      0.0,
      90.0,
      0.0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": {
      "modelName": "Aotus107_Colors",
      "model": "Aotus107_Colors.glb",
      "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/",
      "description": "Cranial elements of juvenile Aotus nancymaae (Aotus107)",
      "orientation": [
        0.0,
        90.0,
        0.0
      ],
      "parts": [
        {
          "name": "Ethmoid",
          "display": "Ethmoid",
          "description": "The ethmoid contributes to the cranial base and facial skeleton",
          "color": "#000080"
        },
        {
          "name": "Frontal",
          "display": "Frontal",
          "description": "The frontal forms bilaterally and contributes to the cranial base and vault of the skull",
          "color": "#ff8f00"
        },
        {
          "name": "Lmaxilloturbinal",
          "display": "Left Maxilloturbinal",
          "description": "The maxilloturbinals form bilaterally as part of the nasal capsule",
          "color": "#aa0aaa"
        },
        {
          "name": "Lmaxilla",
          "display": "Left Maxilla",
          "description": "The maxillae form bilaterally as part of the facial skeleton",
          "color": "#ba55d3"
        },
        {
          "name": "Lnasal",
          "display": "Left Nasal",
          "description": "The nasals form bilaterally as part of the facial skeleton",
          "color": "#90ee90"
        },
        {
          "name": "Lpalatine",
          "display": "Left Palatine",
          "description": "The palatines form bilaterally as part of the facial skeleton",
          "color": "#ff4500"
        },
        {
          "name": "Lparietal",
          "display": "Left Parietal",
          "description": "The parietals form bilaterally as part of the cranial vault",
          "color": "#ffc0cb"
        },
        {
          "name": "Ltemporal",
          "display": "Left Temporal",
          "description": "The temporals form bilaterally and contribute to the cranial base and vault of the skull",
          "color": "#ffa07a"
        },
        {
          "name": "Lzygomatic",
          "display": "Left Zygomatic",
          "description": "The zygomatics form bilaterally as part of the facial skeleton",
          "color": "#001fff"
        },
        {
          "name": "Mandible_forColors",
          "display": "Mandible",
          "description": "The mandible forms bilaterally and comprises the lower jaw of the skull",
          "color": "#fbff00"
        },
        {
          "name": "Occipital",
          "display": "Occipital",
          "description": "The occipital contributes to the cranial base and vault of the skull",
          "color": "#ffff99"
        },
        {
          "name": "Rmaxilloturbinal",
          "display": "Right Maxilloturbinal",
          "description": "The maxilloturbinals form bilaterally as part of the nasal capsule",
          "color": "#aa0aaa"
        },
        {
          "name": "Rmaxilla",
          "display": "Right Maxilla",
          "description": "The maxillae form bilaterally as part of the facial skeleton",
          "color": "#ba55d3"
        },
        {
          "name": "Rnasal",
          "display": "Right Nasal",
          "description": "The nasals form bilaterally as part of the facial skeleton",
          "color": "#90ee90"
        },
        {
          "name": "Rpalatine",
          "display": "Right Palatine",
          "description": "The palatines form bilaterally as part of the facial skeleton",
          "color": "#ff4500"
        },
        {
          "name": "Rparietal",
          "display": "Right Parietal",
          "description": "The parietals form bilaterally as part of the cranial vault",
          "color": "#ffc0cb"
        },
        {
          "name": "Rtemporal",
          "display": "Right Temporal",
          "description": "The temporals form bilaterally and contribute to the cranial base and vault of the skull",
          "color": "#ffa07a"
        },
        {
          "name": "Rzygomatic",
          "display": "Right Zygomatic",
          "description": "The zygomatics form bilaterally as part of the facial skeleton",
          "color": "#001fff"
        },
        {
          "name": "Sphenoid",
          "display": "Sphenoid",
          "description": "The sphenoid is a midline structure at the center of the skull and contributes to the cranial base, cranial vault, and even the facial skeleton",
          "color": "#006400"
        },
        {
          "name": "Vomer",
          "display": "Vomer",
          "description": "The vomer is a midline structure that contributes to the nasal septum",
          "color": "#a9a9a9"
        }
      ],
      "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/Aotus107_Colors.glb"
    },
    "teeth": {
      "modelName": "Aotus107_Teeth_v2",
      "model": "Aotus107_Teeth_v2.glb",
      "partCount": 58,
      "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/Aotus107_Teeth_v2.glb"
    },
    "badges": [
      "Taxon",
      "Juvenile",
      "Segmented bones",
      "Teeth"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/Aotus107_Taxon_v3.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/AotusModels/Aotus107_Taxon_v3.json",
    "placeholder": false
  },
  {
    "id": "aotus108",
    "modelName": "Aotus108_Taxon",
    "description": "Skull of newborn Aotus (Aotus108)",
    "scientific": "Aotus nancymaae",
    "common": "Nancy Ma's night monkey",
    "family": "Aotidae",
    "subfamily": "Aotinae",
    "infraorder": "Platyrrhini",
    "suborder": "Haplorrhini",
    "traits": [
      "Platyrrhine",
      "Enlarged orbits",
      "Segmented bones",
      "Teeth model"
    ],
    "catalog": "Aotus108",
    "age": "Newborn",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/",
    "model": "Aotus108_Taxon.glb",
    "orientation": [
      0.0,
      90.0,
      0.0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": {
      "modelName": "Aotus108_Colors",
      "model": "Aotus108_Colors.glb",
      "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/",
      "description": "Cranial elements of newborn Aotus nancymaae (Aotus108)",
      "orientation": [
        0.0,
        90.0,
        0.0
      ],
      "parts": [
        {
          "name": "Ethmoid",
          "display": "Ethmoid",
          "description": "The ethmoid contributes to the cranial base and facial skeleton",
          "color": "#000080"
        },
        {
          "name": "Frontal",
          "display": "Frontal",
          "description": "The frontal forms bilaterally and contributes to the cranial base and vault of the skull",
          "color": "#ff8f00"
        },
        {
          "name": "Lmaxilloturbinal",
          "display": "Left Maxilloturbinal",
          "description": "The maxilloturbinals form bilaterally as part of the nasal capsule",
          "color": "#aa0aaa"
        },
        {
          "name": "Lmaxilla",
          "display": "Left Maxilla",
          "description": "The maxillae form bilaterally as part of the facial skeleton",
          "color": "#ba55d3"
        },
        {
          "name": "Lnasal",
          "display": "Left Nasal",
          "description": "The nasals form bilaterally as part of the facial skeleton",
          "color": "#90ee90"
        },
        {
          "name": "Lpalatine",
          "display": "Left Palatine",
          "description": "The palatines form bilaterally as part of the facial skeleton",
          "color": "#ff4500"
        },
        {
          "name": "Lparietal",
          "display": "Left Parietal",
          "description": "The parietals form bilaterally as part of the cranial vault",
          "color": "#ffc0cb"
        },
        {
          "name": "Ltemporal",
          "display": "Left Temporal",
          "description": "The temporals form bilaterally and contribute to the cranial base and vault of the skull",
          "color": "#ffa07a"
        },
        {
          "name": "Lzygomatic",
          "display": "Left Zygomatic",
          "description": "The zygomatics form bilaterally as part of the facial skeleton",
          "color": "#001fff"
        },
        {
          "name": "Mandible",
          "display": "Mandible",
          "description": "The mandible forms bilaterally and comprises the lower jaw of the skull",
          "color": "#c4553a"
        },
        {
          "name": "Occipital",
          "display": "Occipital",
          "description": "The occipital contributes to the cranial base and vault of the skull",
          "color": "#ffff99"
        },
        {
          "name": "Rmaxilloturbinal",
          "display": "Right Maxilloturbinal",
          "description": "The maxilloturbinals form bilaterally as part of the nasal capsule",
          "color": "#aa0aaa"
        },
        {
          "name": "Rmaxilla",
          "display": "Right Maxilla",
          "description": "The maxillae form bilaterally as part of the facial skeleton",
          "color": "#ba55d3"
        },
        {
          "name": "Rnasal",
          "display": "Right Nasal",
          "description": "The nasals form bilaterally as part of the facial skeleton",
          "color": "#90ee90"
        },
        {
          "name": "Rpalatine",
          "display": "Right Palatine",
          "description": "The palatines form bilaterally as part of the facial skeleton",
          "color": "#ff4500"
        },
        {
          "name": "Rparietal",
          "display": "Right Parietal",
          "description": "The parietals form bilaterally as part of the cranial vault",
          "color": "#ffc0cb"
        },
        {
          "name": "Rtemporal",
          "display": "Right Temporal",
          "description": "The temporals form bilaterally and contribute to the cranial base and vault of the skull",
          "color": "#ffa07a"
        },
        {
          "name": "Rzygomatic",
          "display": "Right Zygomatic",
          "description": "The zygomatics form bilaterally as part of the facial skeleton",
          "color": "#001fff"
        },
        {
          "name": "Sphenoid",
          "display": "Sphenoid",
          "description": "The sphenoid is a midline structure at the center of the skull and contributes to the cranial base, cranial vault, and even the facial skeleton",
          "color": "#006400"
        },
        {
          "name": "Vomer",
          "display": "Vomer",
          "description": "The vomer is a midline structure that contributes to the nasal septum",
          "color": "#a9a9a9"
        }
      ],
      "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/Aotus108_Colors.glb"
    },
    "teeth": {
      "modelName": "Aotus108_Teeth",
      "model": "Aotus108_Teeth_v2.glb",
      "partCount": 58,
      "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/Aotus108_Teeth_v2.glb"
    },
    "badges": [
      "Taxon",
      "Newborn",
      "Segmented bones",
      "Teeth"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/AotusModels/Aotus108_Taxon.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/AotusModels/Aotus108_Taxon.json",
    "placeholder": false
  },
  {
    "id": "cp17",
    "modelName": "Cp17_Taxon_v0",
    "description": "Skull of newborn Cebuella (Cp17)",
    "scientific": "Cebuella pygmaea",
    "common": "Pygmy marmoset",
    "family": "Cebidae",
    "subfamily": "Callitrichinae",
    "infraorder": "Platyrrhini",
    "suborder": "Haplorrhini",
    "traits": [
      "Platyrrhine"
    ],
    "catalog": "Cp17",
    "age": "Newborn",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/CebuellaModels/",
    "model": "Cp17_Taxon_v0.glb",
    "orientation": [
      0.0,
      90.0,
      0.0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": null,
    "teeth": null,
    "badges": [
      "Taxon",
      "Newborn"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/CebuellaModels/Cp17_Taxon_v0.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/CebuellaModels/Cp17_Taxon_v0.json",
    "placeholder": false
  },
  {
    "id": "usnm-337324",
    "modelName": "USMN-337324_Taxon",
    "description": "Skull of adult Cebuella pygmaea (USMN-337324)",
    "scientific": "Cebuella pygmaea",
    "common": "Pygmy marmoset",
    "family": "Cebidae",
    "subfamily": "Callitrichinae",
    "infraorder": "Platyrrhini",
    "suborder": "Haplorrhini",
    "traits": [
      "Platyrrhine",
      "Teeth model"
    ],
    "catalog": "USNM-337324",
    "age": "Adult",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/CebuellaModels/",
    "model": "USNM-337324_Taxon.glb",
    "orientation": [
      -90,
      145,
      0
    ],
    "viewerQuaternion": [-0.69224, 0.17998, 0.11151, 0.68993],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": null,
    "teeth": {
      "modelName": "USMN-337324_Teeth",
      "model": "USNM-337324_Teeth.glb",
      "partCount": 34,
      "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/CebuellaModels/USNM-337324_Teeth.glb"
    },
    "badges": [
      "Taxon",
      "Adult",
      "Teeth"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/CebuellaModels/USNM-337324_Taxon.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/CebuellaModels/USMN-337324_Taxon.json",
    "placeholder": false
  },
  {
    "id": "dlc-6661",
    "modelName": "DLC-6661_Taxon",
    "description": "Skull of newborn Lemur catta (DLC-6661)",
    "scientific": "Lemur catta",
    "common": "Ring-tailed lemur",
    "family": "Lemuridae",
    "subfamily": "Lemurinae",
    "infraorder": "Lemuriformes",
    "suborder": "Strepsirrhini",
    "traits": [
      "Strepsirrhine"
    ],
    "catalog": "DLC-6661",
    "age": "Newborn",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/LemurModels/",
    "model": "DLC-6661_Taxon.glb",
    "orientation": [
      0.0,
      90.0,
      0.0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": null,
    "teeth": null,
    "badges": [
      "Taxon",
      "Newborn"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/LemurModels/DLC-6661_Taxon.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/LemurModels/DLC-6661_Taxon.json",
    "placeholder": false
  },
  {
    "id": "amnh-170777",
    "modelName": "AMNH-170777_Taxon",
    "description": "Skull of infant Lemur catta (AMNH-170777)",
    "scientific": "Lemur catta",
    "common": "Ring-tailed lemur",
    "family": "Lemuridae",
    "subfamily": "Lemurinae",
    "infraorder": "Lemuriformes",
    "suborder": "Strepsirrhini",
    "traits": [
      "Strepsirrhine"
    ],
    "catalog": "AMNH-170777",
    "age": "Infant",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/LemurModels/",
    "model": "AMNH-170777_Taxon.glb",
    "orientation": [
      0.0,
      90.0,
      0.0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": null,
    "teeth": null,
    "badges": [
      "Taxon",
      "Infant"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/LemurModels/AMNH-170777_Taxon.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/LemurModels/AMNH-170777_Taxon.json",
    "placeholder": false
  },
  {
    "id": "amnh-201183",
    "modelName": "AMNH-201183_Taxon",
    "description": "Skull of adult Lemur catta (AMNH-201183)",
    "scientific": "Lemur catta",
    "common": "Ring-tailed lemur",
    "family": "Lemuridae",
    "subfamily": "Lemurinae",
    "infraorder": "Lemuriformes",
    "suborder": "Strepsirrhini",
    "traits": [
      "Strepsirrhine"
    ],
    "catalog": "AMNH-201183",
    "age": "Adult",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/LemurModels/",
    "model": "AMNH-201183_Taxon.glb",
    "orientation": [
      0.0,
      90.0,
      0.0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": null,
    "teeth": null,
    "badges": [
      "Taxon",
      "Adult"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/LemurModels/AMNH-201183_Taxon.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/LemurModels/AMNH-201183_Taxon.json",
    "placeholder": false
  },
  {
    "id": "dlc-6905",
    "modelName": "DLC-6905_Taxon",
    "description": "Skull of newborn Propithecus (DLC-6905)",
    "scientific": "Propithecus",
    "common": "Sifaka",
    "family": "Indriidae",
    "subfamily": "Indriinae",
    "infraorder": "Lemuriformes",
    "suborder": "Strepsirrhini",
    "traits": [
      "Strepsirrhine"
    ],
    "catalog": "DLC-6905",
    "age": "Newborn",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/PropithecusModels/",
    "model": "DLC-6905_Taxon.glb",
    "orientation": [
      0.0,
      90.0,
      0.0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": null,
    "teeth": null,
    "badges": [
      "Taxon",
      "Newborn"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/PropithecusModels/DLC-6905_Taxon.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/PropithecusModels/DLC-6905_Taxon.json",
    "placeholder": false
  },
  {
    "id": "dlc-6841m",
    "modelName": "DLC-6841m_Taxon",
    "description": "Skull of adult Propithecus (DLC-6841m)",
    "scientific": "Propithecus",
    "common": "Sifaka",
    "family": "Indriidae",
    "subfamily": "Indriinae",
    "infraorder": "Lemuriformes",
    "suborder": "Strepsirrhini",
    "traits": [
      "Strepsirrhine"
    ],
    "catalog": "DLC-6841m",
    "age": "Adult",
    "sex": "Not stated in SkeletalGrowthDB",
    "provenance": "Not stated in SkeletalGrowthDB",
    "place": "Not stated in SkeletalGrowthDB",
    "collected": "Not stated in SkeletalGrowthDB",
    "collector": "Not stated in SkeletalGrowthDB",
    "modality": "Not stated in SkeletalGrowthDB",
    "resolution": "Not stated in SkeletalGrowthDB",
    "scanner": "Not stated in SkeletalGrowthDB",
    "units": "mm",
    "unitsNote": "BiologicalScaleMM is 1 in this database record. The Unity OsteologyViewer treats that value as millimeters per scene unit.",
    "root": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/PropithecusModels/",
    "model": "DLC-6841m_Taxon.glb",
    "orientation": [
      0.0,
      90.0,
      0.0
    ],
    "parts": [
      {
        "name": "Teeth_max",
        "display": "Upper Teeth",
        "description": "Maxillary teeth",
        "color": "#fffac8"
      },
      {
        "name": "Teeth_mand",
        "display": "Lower Teeth",
        "description": "Mandibular teeth",
        "color": "#fffac8"
      },
      {
        "name": "Mandible_forTaxon",
        "display": "Mandible",
        "description": "Mandible",
        "color": "#cec3ad"
      },
      {
        "name": "CranialBase",
        "display": "Cranium",
        "description": "Cranium",
        "color": "#cec3ad"
      },
      {
        "name": "Calotte",
        "display": "Calotte",
        "description": "Calotte",
        "color": "#cec3ad"
      }
    ],
    "colors": null,
    "teeth": null,
    "badges": [
      "Taxon",
      "Adult"
    ],
    "glbUrl": "https://digitalworlds.github.io/SkeletalGrowthDB/Models/PropithecusModels/DLC-6841m_Taxon.glb",
    "metaUrl": "https://github.com/digitalworlds/SkeletalGrowthDB/blob/main/Models/PropithecusModels/DLC-6841m_Taxon.json",
    "placeholder": false
  }
];

export const growthStages = [
  {
    "id": "neonate",
    "label": "Newborn",
    "specimenId": "aotus108"
  },
  {
    "id": "juvenile",
    "label": "Juvenile",
    "specimenId": "aotus107"
  },
  {
    "id": "adult",
    "label": "Adult",
    "specimenId": "dwa-aotus1"
  }
];
export function getSpecimen(id) {
  return specimens.find((item) => item.id === id) || specimens[0];
}

export function viewableSpecimens() {
  return specimens.filter((item) => item.model);
}

export function boneSpecimen(specimen) {
  if (!specimen?.colors) return specimen;
  return {
    ...specimen,
    model: specimen.colors.model,
    modelName: specimen.colors.modelName,
    description: specimen.colors.description || specimen.description,
    orientation: specimen.colors.orientation || specimen.orientation,
    parts: specimen.colors.parts,
    glbUrl: specimen.colors.glbUrl,
    root: specimen.colors.root || specimen.root
  };
}

export function citation(specimen) {
  const url = specimen.glbUrl;
  const apa = `Digital Worlds Institute. (n.d.). ${specimen.description} [3D model]. Skeletal Growth Database. ${url}`;
  const bibtex = [
    `@misc{${specimen.id.replace(/[^a-z0-9]/gi, "_")},`,
    `  author = {{Digital Worlds Institute}},`,
    `  title = {${specimen.description}},`,
    `  howpublished = {3D model, Skeletal Growth Database},`,
    `  note = {Catalog ${specimen.catalog}. Part metadata from the accompanying JSON.},`,
    `  url = {${url}}`,
    `}`
  ].join("\n");
  return { apa, bibtex };
}
