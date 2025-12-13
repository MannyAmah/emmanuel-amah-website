import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

const notesToSeed = [
    {
        title: 'About Me',
        slug: 'about-me',
        emoji: '📍',
        is_public: true,
        is_pinned: true,
        content: `I work at the intersection of **medicine**, **biomedical science**, and **software**.

I'm building tools that turn **multimodal health data** (clinical, lifestyle, environment, sensors) into **real-time, actionable prevention + treatment insights**.

Right now I'm focused on:

- [Human Digital Twin platform](https://livemoreai.com) for simulation + prediction
- **LIFE** ("Longevity Intelligence & Functional Evaluation") wearable sensing + patents
- **AI in medicine** (clinical decision support, risk forecasting, and care personalization)
- **AI-enabled drug development**, especially for **longevity/geromedicine**

My core obsession: How do we move healthcare from "reactive" to **continuous + preventive**, where we can **simulate** the future and intervene early?

That leads to three themes I keep returning to:

### digital twins for health

A "digital twin" shouldn't just display data — it should help answer:

- *What's changing?*
- *Why is it changing?*
- *What happens if we do X?*

### wearables that become clinical instruments

I'm interested in wearables that can capture meaningful signals (not noise), translate them into physiology, and support decision-making.

### longevity + drug development

I'm especially interested in the pipeline from: biomarkers → mechanisms → targets → interventions → trials → outcomes.

---

**I write about:** digital twins, wearable biomarkers, AI in healthcare, disease prevention, precision medicine, longevity, health coaching, and the business side (sales + marketing).

**If you want to collaborate:** I love building with clinicians, engineers, researchers, and operators who care about rigorous science and real-world adoption.`
    },
    {
        title: 'Now',
        slug: 'now',
        emoji: '📅',
        is_public: true,
        is_pinned: true,
        content: `### december 2025

I'm currently:

- designing and prototyping the **LIFE** wearable sensing system and patent-ready documentation
- building a [Human Digital Twin platform](https://livemoreai.com) that can ingest multimodal data and output risk forecasts + personalized plans
- studying how to connect **physiology models + ML models** (so insights are explainable *and* predictive)
- learning from the best open-source tools in: signal processing, interoperability (FHIR/OMOP), computational physiology, and drug discovery ML`
    },
    {
        title: 'Projects',
        slug: 'projects',
        emoji: '🚀',
        is_public: true,
        is_pinned: true,
        content: `### human digital twin (livemore health)

A precision-medicine system for individuals + clinicians that models health trajectories and supports prevention planning.

### LIFE wearable system + patents

Real-time sensing and health-state inference, designed to integrate directly into the digital twin.

### clinical + biomedical AI prototypes

Early detection, longitudinal monitoring, personalized interventions, and patient/doctor dashboards.

### drug development for longevity

Tooling and research pathways that connect biomarkers, targets, and intervention testing.`
    },
    {
        title: 'Principles',
        slug: 'principles',
        emoji: '📖',
        is_public: true,
        is_pinned: false,
        content: `principles I try to build by:

- prevention beats rescue (most of the time)
- data is only useful if it changes action
- interpretability matters in medicine
- build systems that work in the real world, not just in papers
- start small, measure hard, iterate fast
- privacy and trust are core product features
- the best UI is clarity
- the best model is the one that survives deployment
- health is multi-factorial; single signals lie
- make it easy for clinicians to say "yes"`
    },
    {
        title: 'Reading List',
        slug: 'reading-list',
        emoji: '📚',
        is_public: true,
        is_pinned: false,
        content: `### digital twins & systems thinking

- [Thinking in Systems](https://www.amazon.com/Thinking-Systems-Donella-Meadows/dp/1603580557) — Donella Meadows
- Complex Adaptive Systems (intro-style resources)

### healthcare + biomedical data

- [Deep Medicine](https://www.amazon.com/Deep-Medicine-Artificial-Intelligence-Healthcare/dp/1541644638) — Eric Topol
- [The Patient Will See You Now](https://www.amazon.com/Patient-Will-See-You-Now/dp/0465040020) — Eric Topol
- Fundamentals of Clinical Data Science (any strong clinical DS text)

### ML/AI

- [Deep Learning](https://www.deeplearningbook.org/) — Goodfellow et al.
- [Designing Machine Learning Systems](https://www.amazon.com/Designing-Machine-Learning-Systems-Production-Ready/dp/1098107969) — Chip Huyen

### drug discovery / longevity

- Drug discovery ML surveys + geroscience reviews (see papers below)

### sales + marketing (for health-tech builders)

- [Traction](https://www.amazon.com/Traction-Startup-Achieve-Explosive-Customer/dp/1591848369) — Gabriel Weinberg
- [Crossing the Chasm](https://www.amazon.com/Crossing-Chasm-Marketing-High-Tech-Mainstream/dp/0062292986) — Geoffrey Moore
- [Influence](https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/006124189X) — Robert Cialdini

---

## github repos (curated)

### digital twins

- [edt-community/awesome-digital-twins](https://github.com/edt-community/awesome-digital-twins) — great map of the ecosystem
- [eclipse-ditto/ditto](https://github.com/eclipse-ditto/ditto) — digital twin pattern for connected devices
- [Azure-Samples/digital-twins-explorer](https://github.com/Azure-Samples/digital-twins-explorer) — visualize/manage twin graphs

### human digital twin foundations

- [BioGearsEngine/core](https://github.com/BioGearsEngine/core) — open-source human physiology engine
- [opencor/opencor](https://github.com/opencor/opencor) — CellML simulation environment
- [opensim-org/opensim-core](https://github.com/opensim-org/opensim-core) — musculoskeletal simulation engine
- [SimVascular/SimVascular](https://github.com/SimVascular/SimVascular) — patient-specific blood flow modeling
- [MarekMatejak/Physiolibrary](https://github.com/MarekMatejak/Physiolibrary) — Modelica human physiology building blocks
- [ComputationalPhysiology/awesome](https://github.com/ComputationalPhysiology/awesome) — computational physiology index

### wearables + biosignal processing

- [neuropsychology/NeuroKit](https://github.com/neuropsychology/NeuroKit) — NeuroKit2 biosignal processing
- [paulvangentcom/heartrate_analysis_python](https://github.com/paulvangentcom/heartrate_analysis_python) — PPG/ECG heart rate + HRV
- [MIT-LCP/wfdb-python](https://github.com/MIT-LCP/wfdb-python) — PhysioNet/WFDB waveform tooling
- [mne-tools/mne-python](https://github.com/mne-tools/mne-python) — EEG/MEG analysis
- [woop/awesome-quantified-self](https://github.com/woop/awesome-quantified-self) — wearables + quantified self landscape

### health data standards

- [openmhealth/schemas](https://github.com/openmhealth/schemas) — wearable/health measurement schemas
- [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) — FHIR server/client
- [OHDSI OMOP CDM](https://ohdsi.github.io/CommonDataModel/) — standardized observational health data model

### healthcare ML

- [sunlabuiuc/PyHealth](https://github.com/sunlabuiuc/PyHealth) — healthcare ML toolkit
- [josephmisiti/awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning) — broad ML index
- [danielecook/Awesome-Bioinformatics](https://github.com/danielecook/Awesome-Bioinformatics) — bioinformatics software index

### drug discovery + computational chemistry

- [DeepChem](https://github.com/deepchem/deepchem) — drug discovery ML toolkit
- [RDKit](https://github.com/rdkit/rdkit) — cheminformatics foundation
- [OpenMM](https://github.com/openmm/openmm) — molecular simulation toolkit
- [DiffDock](https://github.com/gcorso/DiffDock) — deep-learning docking
- [Awesome-GNN-based-drug-discovery](https://github.com/gozsari/Awesome-GNN-based-drug-discovery) — GNN drug discovery tools

### knowledge graphs + biomedical ontologies

- Hetionet — biomedical network for repurposing-style reasoning
- Biolink Model — schema layer for biomedical KG interoperability
- Monarch Initiative — KG + phenotype/genotype integration ecosystem

### real-time health visualization

- [grafana/grafana](https://github.com/grafana/grafana) — dashboards + observability UI
- [influxdata/influxdb](https://github.com/influxdata/influxdb) — time-series datastore
- [timescale/timescaledb](https://github.com/timescale/timescaledb) — Postgres time-series analytics
- [apache/kafka](https://github.com/apache/kafka) — streaming backbone for sensor pipelines

---

## research articles

### digital twins in healthcare

- [Digital Twins' Advancements and Applications in Healthcare](https://pmc.ncbi.nlm.nih.gov/articles/PMC11595921/) (PMC review)
- [A scoping review of human digital twins in healthcare](https://www.nature.com/articles/s41746-025-01910-w) (npj Digital Medicine)
- [Digital twins in healthcare: a comprehensive review](https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2025.1633539/full) (Frontiers, 2025)
- [A comprehensive review of digital twin in healthcare](https://pmc.ncbi.nlm.nih.gov/articles/PMC11705329/) (PMC, 2025)

### longevity / geroscience

- [Hallmarks of aging: An expanding universe](https://pubmed.ncbi.nlm.nih.gov/36599349/) (2023)
- [From geroscience to precision geromedicine](https://www.cell.com/cell/fulltext/S0092-8674(25)00284-3) (Cell, 2025)

### AI for drug discovery

- [AI-Driven Drug Discovery: A Comprehensive Review (2019–2024)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12177741/) (PMC, 2025)
- [AI enhances drug discovery and development](https://academic.oup.com/nsr/article/11/3/nwad303/7453682) (NSR, 2024)`
    },
    {
        title: 'Links',
        slug: 'links',
        emoji: '🔗',
        is_public: true,
        is_pinned: false,
        content: `A living map of the resources I regularly return to while building prevention-focused health tech, human digital twins, wearables, and longevity R&D.

---

## research search engines & paper workflows

- [PubMed](https://pubmed.ncbi.nlm.nih.gov/) (biomedical abstracts + links to full text when available)
- [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/) (full-text biomedical papers)
- [Google Scholar](https://scholar.google.com/) (broad academic search)
- [Semantic Scholar](https://www.semanticscholar.org/) (great for discovery + citation graphs)
- [OpenAlex](https://openalex.org/) (open research graph; useful for mapping fields)
- [arXiv](https://arxiv.org/) / [bioRxiv](https://www.biorxiv.org/) / [medRxiv](https://www.medrxiv.org/) (preprints: ML + biology + medicine)
- [ClinicalTrials.gov](https://clinicaltrials.gov/) (trial design + endpoints + outcomes)
- FDA / EMA databases (regulatory decisions, labels, safety signals)

**How I read papers**
- Start with 2–3 reviews → collect the landmark citations → follow citation graph forward.
- Capture: problem, dataset, method, endpoints, limitations, "what would change my mind?"

---

## digital twins (health + device + simulation)

**Twin infrastructure / patterns**
- Digital twin "awesome lists" (ecosystem maps)
- [Azure Digital Twins explorer](https://github.com/Azure-Samples/digital-twins-explorer) (visual twin graph management)
- [Eclipse Ditto](https://github.com/eclipse-ditto/ditto) (device/twin messaging pattern)

**Physiology & simulation**
- [BioGears](https://github.com/BioGearsEngine/core) (human physiology engine)
- [OpenSim](https://github.com/opensim-org/opensim-core) (musculoskeletal simulation)
- [SimVascular](https://github.com/SimVascular/SimVascular) (blood flow + patient-specific modeling)
- [OpenCOR](https://github.com/opencor/opencor) / CellML ecosystem (reusable physiology models)

---

## wearables + biosignals (real-time physiology)

**Signal processing**
- [NeuroKit2](https://github.com/neuropsychology/NeuroKit) (EDA/ECG/HRV pipelines)
- [HeartPy](https://github.com/paulvangentcom/heartrate_analysis_python) (PPG/HR/HRV)
- [WFDB tools](https://github.com/MIT-LCP/wfdb-python) (PhysioNet waveform formats + utilities)
- [MNE](https://github.com/mne-tools/mne-python) (EEG/MEG processing)

**Datasets**
- [PhysioNet](https://physionet.org/) (waveforms + challenges)
- [UK Biobank](https://www.ukbiobank.ac.uk/) (when accessible; massive population-scale)
- NIH/NLM & NCBI resources (genomics + clinical references)

---

## healthcare data standards & interoperability

- [HL7 FHIR](https://hl7.org/fhir/) (data model + APIs for clinical exchange)
- [HAPI FHIR](https://github.com/hapifhir/hapi-fhir) (practical server/client implementation)
- [OHDSI / OMOP CDM](https://ohdsi.github.io/CommonDataModel/) (observational data standardization)
- SNOMED CT / LOINC / ICD (clinical vocabularies; mapping matters)

---

## biomedical knowledge graphs & targets

- [Open Targets](https://www.opentargets.org/) (disease ↔ gene ↔ drug evidence)
- [GWAS Catalog](https://www.ebi.ac.uk/gwas/) (genetic association evidence)
- [Monarch Initiative](https://monarchinitiative.org/) / phenotype resources
- Hetionet (network-style biomedical reasoning)

---

## drug discovery & computational biology

- [RDKit](https://github.com/rdkit/rdkit) (cheminformatics foundation)
- [DeepChem](https://github.com/deepchem/deepchem) (drug discovery ML toolkit)
- [OpenMM](https://github.com/openmm/openmm) (molecular simulation)
- [DiffDock](https://github.com/gcorso/DiffDock) (DL docking methods; good for exploring structure-based workflows)
- AlphaFold/OpenFold ecosystem (protein structure workflows)

---

## longevity & prevention

- Hallmarks of Aging literature (mechanism framing)
- Biomarker discovery: proteomics/metabolomics/epigenetics resources
- Geroscience reviews (interventions + translational pathways)

---

## product, growth, and commercialization (health-tech reality)

- [YC Library](https://www.ycombinator.com/library) (startup fundamentals + GTM)
- "Crossing the Chasm" frameworks (adoption + distribution)
- Practical sales: discovery calls, ICP definition, messaging tests
- Marketing experiments: content → distribution → measurement loops

---

## communities / conferences I track

- Digital health + wearables conferences
- Computational biology & ML conferences
- Longevity/geroscience meetings
- Clinical informatics communities (FHIR/OMOP builders)

---

## my filter for "good links"

- Is it actionable?
- Does it explain endpoints & failure modes?
- Does it survive deployment / real-world messiness?
- Does it help a clinician (or patient) make a better decision?`
    },
    {
        title: 'Ideas',
        slug: 'ideas',
        emoji: '💡',
        is_public: true,
        is_pinned: false,
        content: `These are directions I keep returning to. Some become projects. Most are research prompts.

---

## human digital twin as a "prevention simulator"

A true digital twin should answer:
- What is changing in my physiology right now?
- Why might it be changing?
- What happens if I change sleep, nutrition, stress, activity, meds, or environment?
- What intervention is most likely to help, and how soon would I expect to see a signal?

---

## real-time health visualization that drives action

Most dashboards show data. I want dashboards that drive decisions:
- "You're trending toward risk" → "Here's the smallest next step" → "Here's what to monitor."

---

## LIFE wearable → clinically meaningful signals

Wearables are often noisy. The goal is:
- Better signal quality + artifact handling
- Physiologic inference (not just raw metrics)
- Explainable summaries clinicians can trust
- Continuous monitoring that respects privacy

---

## N-of-1 trials for everyday life

Personalized medicine can start with:
- "Single-person trials" (structured self-experiments)
- Clear endpoints
- Lightweight protocols
- A model that updates as evidence accumulates

---

## "prevention operating system"

A prevention OS would combine:
- longitudinal data
- clinical standards (FHIR/OMOP)
- coaching workflows
- simulation/forecasting
- and a feedback loop that adapts to real life

---

## digital twin for longevity R&D

Connect the pipeline:
biomarkers → mechanisms → targets → interventions → outcomes  
…and make it practical for:
- early-stage hypothesis testing
- trial design support
- phenotyping + stratification
- real-world evidence loops

---

## disease prevention as a product, not a lecture

Most people don't need more information.
They need:
- frictionless workflows
- behavior design
- accountability loops
- and outcomes that feel tangible

---

## privacy-preserving health intelligence

I'm interested in architectures that keep trust intact:
- minimum data exposure
- local/on-device inference when possible
- strong audit trails
- clear user control over sharing

---

## health coaching amplified by AI (but still human)

AI should reduce admin work and improve follow-through:
- summaries, plans, check-ins, personalization
- not replace the human relationship

---

## big questions I'm obsessed with

- What does "health" mean quantitatively?
- Which signals change earliest before disease?
- How do we validate wearables clinically without slowing innovation?
- How do we make personalized prevention affordable at scale?
- What does the future of medicine look like when simulation becomes normal?`
    },
    {
        title: 'Tech Stack',
        slug: 'tech-stack',
        emoji: '🛠️',
        is_public: true,
        is_pinned: false,
        content: `This stack evolves as the product evolves. I care most about reliability, clarity, and shipping.

---

## frontend (patient + doctor dashboards)

- TypeScript
- React + Next.js
- Tailwind CSS (fast, consistent UI)
- MD/MDX for notes-style content when useful

---

## backend / APIs

- Next.js API routes (simple endpoints)
- Node.js services when needed
- Python (for data science + model experimentation)
- FastAPI (for ML/analytics services)

---

## data layer (longitudinal + time-series)

- Postgres (core system of record)
- Time-series patterns (Timescale/Influx-style approaches depending on needs)
- Redis (caching + queues)
- Object storage for large files (labs, waveforms, documents)

---

## streaming (real-time wearable ingestion)

- MQTT / WebSockets (device-to-cloud patterns)
- Kafka-style streaming when scale requires it

---

## ML / analytics

- NumPy / Pandas
- scikit-learn (baselines + feature work)
- PyTorch (deep learning)
- Time-series modeling + signal processing workflows
- Evaluation-first mindset: baselines, ablations, monitoring

---

## retrieval / knowledge (clinical + research)

- Vector search for research/clinical notes (pgvector/Chroma-style approaches)
- Structured knowledge layers (ontologies + KG patterns)

---

## interoperability (clinical integration)

- HL7 FHIR concepts (resources, bundles, terminology)
- HAPI FHIR when implementing real endpoints
- OMOP concepts for observational datasets

---

## observability (when it's "real-time health")

- Logging, metrics, traces
- Dashboards (Grafana-style monitoring)
- Alerting for pipeline failures and sensor drift

---

## devops / deployment

- GitHub + Actions (CI/CD)
- Vercel / Azure / cloud hosting depending on the app
- Environment variable hygiene + secrets management

---

## device / wearable (concept + integration direction)

- BLE and mobile-to-cloud relay patterns
- Firmware + sensor pipelines (as specs mature)
- Secure device identity + data integrity

---

## my defaults

- Build something simple that works.
- Measure it.
- Improve the parts that matter most.
- Keep the clinician/user workflow sacred.`
    }
]

// Mapping of existing note titles to update (case-insensitive matching)
const titleMappings: Record<string, string> = {
    'about': 'About Me',
    'about me': 'About Me',
    'reading list': 'Reading List',
    'projects': 'Projects',
    'now': 'Now',
    'principles': 'Principles',
    'links': 'Links',
    'ideas': 'Ideas',
    'tech stack': 'Tech Stack'
}

export async function POST() {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (!adminSession) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const results = []

        for (const note of notesToSeed) {
            // First, try to find existing note by slug
            let existingNote = null

            const { data: bySlug } = await supabase
                .from('notes')
                .select('id, title')
                .eq('slug', note.slug)
                .single()

            if (bySlug) {
                existingNote = bySlug
            } else {
                // Try to find by title (case-insensitive)
                const { data: allNotes } = await supabase
                    .from('notes')
                    .select('id, title')
                    .eq('is_public', true)

                if (allNotes) {
                    const lowerTitle = note.title.toLowerCase()
                    existingNote = allNotes.find(n =>
                        n.title.toLowerCase() === lowerTitle ||
                        titleMappings[n.title.toLowerCase()] === note.title
                    )
                }
            }

            if (existingNote) {
                // Update existing note
                const { data, error } = await supabase
                    .from('notes')
                    .update({
                        title: note.title,
                        slug: note.slug,
                        emoji: note.emoji,
                        content: note.content,
                        is_public: note.is_public,
                        is_pinned: note.is_pinned,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', existingNote.id)
                    .select()
                    .single()

                if (error) {
                    results.push({ slug: note.slug, status: 'error', error: error.message })
                } else {
                    results.push({ slug: note.slug, status: 'updated', id: data.id, oldTitle: existingNote.title })
                }
            } else {
                // Create new note
                const { data, error } = await supabase
                    .from('notes')
                    .insert({
                        title: note.title,
                        slug: note.slug,
                        emoji: note.emoji,
                        content: note.content,
                        is_public: note.is_public,
                        is_pinned: note.is_pinned
                    })
                    .select()
                    .single()

                if (error) {
                    results.push({ slug: note.slug, status: 'error', error: error.message })
                } else {
                    results.push({ slug: note.slug, status: 'created', id: data.id })
                }
            }
        }

        return NextResponse.json({ success: true, results })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to seed notes' }, { status: 500 })
    }
}
