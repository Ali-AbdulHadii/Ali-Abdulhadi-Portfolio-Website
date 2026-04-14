// =============================================================
// PROJECT DATA  –  Ali Abdulhadi Engineering Portfolio
// =============================================================

export type Category =
  | 'Business Websites'
  | 'Internal Tools & Automation'
  | 'E-Commerce & Billing'
  | 'Mobile & Real-Time Apps'
  | 'Data & AI Products';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: Category;
  listTag?: string;
  currentWork?: boolean;
  summary: string;
  role: string;
  stack: string[];
  featured?: boolean;
  accentColor?: string;

  /** Primary preview image shown on the card and at the top of the detail page */
  coverImage?: string;
  /** Extra screenshots / gifs shown in a gallery on the detail page */
  gallery?: string[];

  problem: string;
  solution: string;
  features: string[];
  technicalDetails: string;
  outcome: string;

  diagram?: {
    title: string;
    code: string;
  };

  codeSnippet?: {
    language: string;
    label: string;
    code: string;
  };
}

const asset = (path: string): string => path.replace(/^\//, '');

// ---------------------------------------------------------------

export const projects: Project[] = [
  // ─── 0a. KAYAN AL ROOH ────────────────────────────────────────
  {
    id: 'kayan-al-rooh',
    title: 'Kayan Al Rooh',
    slug: 'kayan-al-rooh',
    category: 'Business Websites',
    listTag: 'Current Work',
    currentWork: true,
    featured: true,
    summary:
      'End-to-end engineering of a premium B2B platform for a private-label perfume manufacturer. Custom-coded from the ground up with a high-end visual identity, Cloudflare enterprise security, NDA-protected internal tooling, and a full client onboarding infrastructure.',
    role: 'Lead Full-Stack Developer & Platform Architect',
    stack: ['Custom Code', 'PHP', 'JavaScript', 'MySQL', 'Cloudflare Enterprise', 'Zero Trust', 'HTML', 'CSS', 'GSAP'],
    gallery: [
      asset('/images/kayanalroohshowcase.mp4'),
      asset('/images/kayanalroohherosection.png'),
      asset('/images/secondsectionkayanalrooh.png'),
    ],
    problem:
      'Kayan Al Rooh operates in a premium B2B segment of the fragrance manufacturing industry, servicing brands and retailers who need private-label perfume production. The business required a digital platform that could simultaneously command confidence from enterprise clients, protect sensitive operational data, and provide a seamless onboarding experience for new manufacturing partners. Off-the-shelf solutions lacked the security depth and visual caliber needed for the brand. All client communications, product formulations, and manufacturing agreements required strict confidentiality, which ruled out any third-party CMS with shared infrastructure.',
    solution:
      'Designed and built the entire platform from scratch using custom PHP and JavaScript, giving full control over every layer of the stack. The public-facing site was engineered with a premium, high-end visual identity reflecting the luxury positioning of the brand. Underneath the surface, a private operational layer was built using Cloudflare Zero Trust, hosting NDA-protected internal tools accessible only to authorized personnel and onboarded clients. A structured client onboarding flow handles partner intake, document exchange, and project initialization in a controlled, auditable environment.',
    features: [
      'Fully custom-coded platform: no WordPress, no builders, no shared CMS infrastructure',
      'High-end brand identity implementation with premium typography, smooth scroll animations, and cinematic hero sections powered by GSAP',
      'Cloudflare Enterprise integration: DDoS protection, WAF rules, bot management, and edge-cached asset delivery',
      'Cloudflare Zero Trust access layer for all internal tooling: identity-verified access only, no public exposure',
      'NDA-protected internal workspace: secure document vault, formulation sheets, and client-specific project files',
      'Client onboarding portal: structured intake form, agreement signing workflow, and project initialization checklist',
      'Manufacturing partner dashboard: order status tracking, sample request management, and production timeline visibility',
      'Custom admin panel for internal operations: client management, NDA status tracking, and communication logs',
      'Full mobile responsiveness with premium interaction design across all breakpoints',
    ],
    technicalDetails:
      'The platform is split into two distinct layers. The public site is a statically-optimized PHP-rendered application with JavaScript-driven animations, served through Cloudflare CDN for sub-100ms global response times. The internal layer runs behind Cloudflare Access with WARP-tunneled routing, ensuring no internal endpoint is publicly resolvable. The client portal uses session-based PHP authentication layered on top of Cloudflare Access for double identity verification. The document vault stores files in a non-web-accessible directory, served only through authenticated PHP file-streaming endpoints. All database queries are parameterized and schema access is segmented by client account ID to prevent any cross-client data exposure. GSAP ScrollTrigger powers the hero and feature reveal animations, with careful performance budgeting to maintain a Lighthouse score above 90.',
    outcome:
      'The platform launched as a flagship digital presence for Kayan Al Rooh, elevating the brand to the visual standard of luxury manufacturing firms. Internal operations moved from scattered emails and spreadsheets to a centralized, auditable, and secure platform. Client onboarding time was reduced significantly, and the Zero Trust layer has maintained zero unauthorized access events since launch. Currently in active production use and ongoing development.',
    diagram: {
      title: 'Platform Architecture: Public + Internal Layer',
      code: `flowchart TD
    subgraph Public["Public-Facing Site"]
      A[Visitor Browser] -->|Cloudflare CDN| B[PHP Application Server]
      B --> C[Premium Brand Site]
      C --> D[Client Onboarding CTA]
    end
    subgraph ZeroTrust["Internal Layer - Zero Trust Protected"]
      D -->|Submit intake form| E[Onboarding Controller]
      E --> F[(MySQL - Client DB)]
      G[Authorized Staff/Client] -->|Cloudflare Access + WARP| H[Identity Verification]
      H -->|Pass| I[Internal Portal]
      H -->|Fail| J[Block]
      I --> K[NDA Document Vault]
      I --> L[Manufacturing Dashboard]
      I --> M[Admin Operations Panel]
      K --> N[PHP File Streamer]
      N --> O[Secure Download]
    end`,
    },
    codeSnippet: {
      language: 'php',
      label: 'Secure Document Vault Streamer (PHP)',
      code: `<?php
// Authenticated file streaming endpoint — files never stored in webroot
function stream_vault_document(int $client_id, string $doc_slug): void {
    $session = require_auth(); // Validates CF Access JWT + PHP session

    $doc = db_query(
        "SELECT file_path, mime_type, original_name
         FROM vault_documents
         WHERE slug = ? AND client_id = ? AND status = 'active'",
        [$doc_slug, $client_id]
    )->fetch();

    if (!$doc || $doc['client_id'] !== $session->client_id) {
        http_response_code(403);
        exit('Access denied.');
    }

    // File lives outside document root — not directly accessible
    $abs_path = VAULT_BASE_DIR . $doc['file_path'];
    if (!file_exists($abs_path)) {
        http_response_code(404);
        exit('Document not found.');
    }

    header('Content-Type: ' . $doc['mime_type']);
    header('Content-Disposition: inline; filename="' . $doc['original_name'] . '"');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store, private');

    readfile($abs_path); // Stream to authenticated client
    audit_log($session->client_id, 'vault_access', $doc_slug);
    exit;
}`,
    },
  },

  // ─── 0b. KIANA FRAGRANCE ──────────────────────────────────────
  {
    id: 'kiana-fragrance',
    title: 'Kiana Fragrance',
    slug: 'kiana-fragrance',
    category: 'E-Commerce & Billing',
    listTag: 'Current Work',
    currentWork: true,
    featured: true,
    summary:
      'Designed and developed a premium B2C perfume e-commerce storefront using WordPress, Elementor, WooCommerce, and custom code. The project focused on a luxury visual identity, clean buying flow, and conversion-first UX.',
    role: 'Lead Full-Stack Developer & E-Commerce Architect',
    stack: ['WordPress', 'Elementor', 'WooCommerce', 'Custom Code', 'PHP', 'JavaScript', 'MySQL', 'Cloudflare', 'CSS', 'Meta Pixel', 'Google Analytics 4'],
    gallery: [asset('/images/kianafragrance.png')],
    problem:
      'The niche perfume market is saturated with brands using identical WooCommerce templates and generic layouts. Kiana Fragrance needed a storefront that communicated luxury, exclusivity, and artistic identity from the first pixel, while also being engineered for high conversion rates. The challenge was to elevate the visual and UX standard far beyond what builders or templates could achieve, while still maintaining a robust e-commerce backend. Product presentation required a cinematic quality, with scent storytelling, rich photography, and editorial-style collection pages, all of which demanded custom-coded templates rather than off-the-shelf solutions.',
    solution:
      'Built the storefront on WordPress with Elementor for flexible content control and WooCommerce for product/order management, then extended it with custom code for premium UI behavior and conversion improvements. Product and collection pages were redesigned for brand storytelling, while cart and checkout were streamlined to reduce friction. Analytics and tracking were integrated to support performance marketing decisions.',
    features: [
      'WordPress + Elementor architecture for fast page building and flexible content updates',
      'WooCommerce storefront with custom product, category, cart, and checkout enhancements',
      'Premium product presentation with high-quality imagery, structured scent-note sections, and branded layouts',
      'Custom code modules for interaction polish, UX improvements, and conversion-focused UI behavior',
      'Conversion-optimized checkout with reduced friction, trust elements, and cleaner purchase flow',
      'Meta Pixel and GA4 enhanced e-commerce tracking for attribution and funnel performance',
      'Gift packaging upsell integration in cart/checkout flow',
      'Cloudflare CDN + image optimization for speed, security, and stable performance',
    ],
    technicalDetails:
      'The platform uses WordPress as the CMS foundation, Elementor for visual page composition, and WooCommerce for catalog, checkout, and order workflows. Custom PHP/JS/CSS was added to override default WooCommerce UX patterns where needed, including product-page layout behavior, cart interactions, and checkout simplification. Tracking includes Meta Pixel and GA4 enhanced e-commerce events for full funnel visibility. Cloudflare handles caching, security filtering, and global asset delivery to maintain fast load times across regions.',
    outcome:
      'Kiana Fragrance launched with a polished premium storefront that better reflects the brand and improves user trust during purchase. The updated product and checkout experience improved overall usability and conversion flow, while analytics integration enabled clearer attribution and ongoing optimization. The platform remains in active production with iterative enhancements.',
    diagram: {
      title: 'WordPress + WooCommerce Conversion Flow',
      code: `flowchart TD
    A[User Arrives] --> B{Entry Point}
    B -->|Search / Social Ad| C[Landing / Collection Page]
    B -->|Direct| F[Product Detail Page]
    C --> F
    F -->|Add to Cart| G[Cart Page]
    G -->|Gift packaging upsell| H[Enhanced Cart]
    H --> I[Checkout - Minimal Fields]
    I -->|Order complete| J[WooCommerce Order DB]
    J --> K[Meta Conversions API]
    J --> L[GA4 Purchase Event]
    K & L --> M[Marketing Attribution Dashboard]`,
    },
  },

  // ─── 1. CORPORATE & BRAND WEBSITES ────────────────────────────
  {
    id: 'corporate-websites',
    title: 'Corporate & Brand Websites',
    slug: 'corporate-brand-websites',
    category: 'Business Websites',
    listTag: '25+ websites',
    featured: true,
    summary:
      'Developed and maintained a portfolio of high-traffic WordPress websites for multiple brands under the Farhood Group and Emirati Digital, with a focus on responsive design, SEO, and enterprise-grade protection.',
    role: 'Frontend Engineer & Web Developer',
    stack: ['WordPress', 'Elementor', 'Cloudflare Enterprise', 'SEO', 'HTML', 'CSS', 'JavaScript'],
    gallery: [
      asset('/images/farhood-group.mp4'),
      asset('/images/farhood-perfumes.mp4'),
      asset('/images/farhood-rental.mp4'),
      asset('/images/unicare-cosmetics.mp4'),
    ],
    problem:
      'Multiple business units (including luxury perfumes, car rentals, yachts, and cosmetics) required professional web presence with consistent brand identity, strong search visibility, and secure, performant infrastructure across dozens of distinct domains.',
    solution:
      'Implemented a reusable design and build framework using WordPress and Elementor. Each site was tailored to its brand while sharing a core structure: optimized performance, Cloudflare Enterprise protection, SEO-ready architecture, and responsive layouts tested across devices and browsers.',
    features: [
      'Delivered websites for Farhood Group, Farhood Perfumes, Unicare Cosmetics, BV Groupe, Farhood Rental, Farhood Yachts, and dozens more',
      'Unicare Cosmetics consistently ranked in the top 5 positions on Google for key product queries',
      'Cloudflare Enterprise integration for DDoS protection, CDN, and WAF across all properties',
      'Custom Elementor components for reusable section structures across brand sites',
      'SEO foundations: structured data, meta optimization, sitemap generation, Core Web Vitals tuning',
      'Performance profiling and image optimization pipelines for fast load times',
    ],
    technicalDetails:
      'Each deployment used a standardized WordPress stack with child-theming to allow brand customization while preserving upgrade paths. Cloudflare Enterprise was configured at the DNS level for every domain, enabling edge caching, bot management, and SSL termination. On-page SEO was implemented systematically using Yoast/RankMath with custom schema markup for products and business entities.',
    outcome:
      'Over 20 production websites delivered across group brands. Unicare Cosmetics achieved and maintained top-5 Google rankings. Zero downtime incidents across the fleet due to Cloudflare Enterprise uptime guarantees.',
  },

  // ─── 2. INTERNAL STAFF PORTAL ─────────────────────────────────
  {
    id: 'internal-portal',
    title: 'Internal Staff Portal',
    slug: 'internal-staff-portal',
    category: 'Internal Tools & Automation',
    featured: true,
    summary:
      'Designed and built a secure internal operations platform for staff-only access, covering announcements, HR workflows, project tracking, and internal tooling. All access is protected by Cloudflare Zero Trust.',
    role: 'Full-Stack Developer & Systems Architect',
    stack: ['Cloudflare Zero Trust', 'WordPress', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    problem:
      'The organization lacked a centralized internal platform for day-to-day operations. Employees relied on scattered communication channels and manual processes for leave requests, announcements, and status updates.',
    solution:
      'Built a private, invitation-only web portal accessible only to authenticated staff via Cloudflare Zero Trust. The portal consolidates all internal workflows into a single dashboard: HR tools, operational announcements, project statuses, and team utilities.',
    features: [
      'Cloudflare Zero Trust access control: no public exposure, identity-verified entry',
      'Announcements board with role-based visibility (management vs. staff)',
      'Vacation request and sick leave management with approval workflows',
      'Project status tracking dashboard with per-team filtering',
      'Staff polls and internal voting system',
      'Centralized links and shortcuts to internal tools',
    ],
    technicalDetails:
      'The portal is built on a hardened WordPress backend with custom PHP plugins handling each workflow module. Access is gated at the network edge via Cloudflare Zero Trust; all traffic is routed through WARP/Access policies. User roles are tied to Active Directory-style group assignments. The leave management module stores requests in a custom MySQL schema with an approval state machine.',
    outcome:
      'Replaced 4 separate tools and email chains with a single, secure internal platform. Staff adoption was immediate due to the clean UX. HR processing time for leave requests dropped by over 60%.',
    diagram: {
      title: 'Portal Access Flow',
      code: `flowchart TD
    A[Staff Browser] -->|HTTPS Request| B(Cloudflare Access)
    B -->|Identity Check| C{Auth Provider}
    C -->|Pass| D[Zero Trust Tunnel]
    C -->|Fail| E[Block / Login Page]
    D --> F[Internal Portal Server]
    F --> G{Role Check}
    G -->|Admin| H[Full Dashboard]
    G -->|Staff| I[Staff Dashboard]
    H --> J[HR Tools / Announcements / Projects]
    I --> J`,
    },
    codeSnippet: {
      language: 'php',
      label: 'Leave Request State Machine (PHP)',
      code: `<?php
// Process leave request approval
function handle_leave_request( int $request_id, string $action, int $approver_id ): bool {
    global $wpdb;
    $table = $wpdb->prefix . 'leave_requests';

    $request = $wpdb->get_row(
        $wpdb->prepare( "SELECT * FROM $table WHERE id = %d", $request_id )
    );

    if ( ! $request || $request->status !== 'pending' ) {
        return false;
    }

    $new_status = ( $action === 'approve' ) ? 'approved' : 'rejected';

    $wpdb->update(
        $table,
        [ 'status' => $new_status, 'reviewed_by' => $approver_id, 'reviewed_at' => current_time('mysql') ],
        [ 'id' => $request_id ]
    );

    // Notify employee via internal notification system
    portal_notify( $request->employee_id, "Your leave request has been $new_status." );
    return true;
}`,
    },
  },

  // ─── 3. MAKAAH E-COMMERCE ─────────────────────────────────────
  {
    id: 'makaah-ecommerce',
    title: 'Anwar Makaah B2C E-Commerce',
    slug: 'makaah-ecommerce',
    category: 'E-Commerce & Billing',
    featured: false,
    gallery: [asset('/images/anwarmakaah.png')],
    summary:
      'Developed a B2C e-commerce storefront using WordPress and WooCommerce, featuring product presentation, marketing pixel integrations, and conversion-focused UX.',
    role: 'E-Commerce Developer',
    stack: ['WordPress', 'WooCommerce', 'Meta Pixel', 'JavaScript', 'CSS', 'HTML'],
    problem:
      'The brand needed a reliable online storefront that could drive conversions from social media traffic, with proper marketing attribution and a product discovery experience aligned with the brand aesthetic.',
    solution:
      'Built a WooCommerce-powered store with a conversion-optimized product layout, Meta Pixel integration for ad attribution and retargeting, and custom category and product page templates.',
    features: [
      'WooCommerce product catalog with custom category templates',
      'Meta Pixel event tracking: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase',
      'Custom checkout flow modifications for reduced drop-off',
      'Responsive product gallery and mobile-first navigation',
      'SEO-optimized product pages with structured data (Product schema)',
      'Coupon and promotional banner system',
    ],
    technicalDetails:
      'Meta Pixel was implemented server-side via WooCommerce hooks to ensure reliable event firing regardless of ad blockers. Product schema markup was added programmatically to all product pages. The checkout flow was customized using WooCommerce filters to reduce field count and streamline the conversion path.',
    outcome:
      'Fully operational storefront with end-to-end purchase tracking. Meta Pixel event accuracy enabled effective retargeting campaigns and ROAS measurement.',
  },

  // ─── 4. ML BUILD ──────────────────────────────────────────────
  {
    id: 'ml-build',
    title: 'ML Build – Game Guide Platform',
    slug: 'ml-build-guide-platform',
    category: 'Data & AI Products',
    featured: true,
    gallery: [asset('/images/ml-build.png')],
    summary:
      'Maintained and developed a long-running Mobile Legends guide platform from 2019 to 2023, handling database architecture, frontend delivery, and structured content management for thousands of hero builds.',
    role: 'Backend Developer & Content Systems Engineer',
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    problem:
      'The platform required a scalable database schema capable of storing and querying hero builds, item combinations, and patch-version-specific metadata, and delivering them to the frontend efficiently across a growing user base.',
    solution:
      'Designed a relational schema for hero and build data, implemented PHP backend logic for querying and serving structured content, and built template-driven frontend pages for individual hero and build guides.',
    features: [
      'Normalized MySQL schema: heroes, items, builds, patches, skills, roles',
      'PHP data retrieval layer with parameterized queries',
      'Dynamic frontend templates populated from database records',
      'Build versioning tied to game patch cycles',
      'Role and tier filtering for hero discovery',
      'Content maintenance across major patches over a 4-year period',
    ],
    technicalDetails:
      'The hero data model used a junction table pattern to handle many-to-many relationships between heroes, roles, and item builds. Queries were optimized with indexed foreign keys and cached outputs for high-traffic hero pages. Frontend templates were PHP-generated with conditional rendering based on hero attributes.',
    outcome:
      'Platform operated reliably for 4+ years through multiple game meta shifts. Build data stayed current with patch cycles, maintaining user trust and return traffic.',
    diagram: {
      title: 'Data Flow: Hero Build Delivery',
      code: `flowchart TD
    A[Admin Input] -->|Insert build data| B[(MySQL DB)]
    B -->|heroes table| C[Hero Records]
    B -->|builds table| D[Build Records]
    B -->|items table| E[Item Records]
    C & D & E -->|JOIN query| F[PHP Controller]
    F -->|Rendered HTML| G[Hero Page Template]
    G -->|Browser| H[User]`,
    },
    codeSnippet: {
      language: 'php',
      label: 'Hero Build Query (PHP)',
      code: `<?php
function get_hero_builds( int $hero_id, ?string $patch = null ): array {
    global $db;
    $sql = "
        SELECT b.id, b.title, b.tier, b.role,
               GROUP_CONCAT(i.name ORDER BY bi.slot SEPARATOR ',') AS items
        FROM builds b
        JOIN build_items bi ON bi.build_id = b.id
        JOIN items i ON i.id = bi.item_id
        WHERE b.hero_id = ?
    ";

    $params = [ $hero_id ];
    if ( $patch ) {
        $sql .= " AND b.patch_version = ?";
        $params[] = $patch;
    }

    $sql .= " GROUP BY b.id ORDER BY b.tier ASC";

    return $db->query( $sql, $params )->fetchAll();
}`,
    },
  },

  // ─── 5. SUBSCRIPTION BILLING SYSTEM ──────────────────────────
  {
    id: 'billing-system',
    title: 'Subscription Billing System',
    slug: 'subscription-billing-system',
    category: 'E-Commerce & Billing',
    featured: true,
    summary:
      'Implemented a subscription and billing flow for an application under NDA, using ASP.NET Core MVC and Stripe. Covers plan creation, webhook handling, and billing lifecycle management.',
    role: 'Backend Engineer',
    stack: ['.NET', 'ASP.NET Core MVC', 'Stripe', 'C#', 'MySQL'],
    problem:
      'The application required a robust subscription billing infrastructure that could handle plan upgrades, cancellations, payment failures, and webhook-driven lifecycle events in a reliable and testable way.',
    solution:
      'Built the billing module on ASP.NET Core MVC with Stripe as the payment processor. Designed endpoint controllers for subscription creation, webhook ingestion, and billing portal access. Implemented idempotent webhook handling to prevent double-processing.',
    features: [
      'Stripe Checkout session creation for new subscriptions',
      'Webhook controller handling: invoice.paid, customer.subscription.updated, customer.subscription.deleted',
      'Subscription state machine stored in application DB (active, past_due, cancelled)',
      'Billing portal redirect for self-service plan management',
      'Plan upgrade/downgrade with proration logic via Stripe API',
      'Retry logic and grace period handling for failed payments',
    ],
    technicalDetails:
      'The webhook endpoint verifies Stripe signature headers before processing any event. Subscription state is replicated in the application database to avoid Stripe API dependency on every request. Entity Framework Core manages the subscription and invoice records. All billing mutations are wrapped in transactions to ensure consistency between Stripe state and local DB state.',
    outcome:
      'Fully operational billing system handling real subscriber traffic. Zero missed webhook events due to idempotency-key design. Billing portal usage reduced support requests significantly.',
    diagram: {
      title: 'Subscription Billing Flow',
      code: `sequenceDiagram
    participant U as User
    participant App as ASP.NET App
    participant Stripe
    participant DB as Application DB

    U->>App: Select plan
    App->>Stripe: Create Checkout Session
    Stripe-->>App: session_url
    App-->>U: Redirect to Stripe Checkout
    U->>Stripe: Enter payment details
    Stripe->>App: POST /webhook (checkout.session.completed)
    App->>DB: Create subscription record (active)
    App-->>U: Unlock premium access
    Stripe->>App: POST /webhook (invoice.paid)
    App->>DB: Update next_billing_date
    Stripe->>App: POST /webhook (invoice.payment_failed)
    App->>DB: Set status = past_due
    App-->>U: Send payment failure email`,
    },
    codeSnippet: {
      language: 'csharp',
      label: 'Stripe Webhook Controller (ASP.NET Core)',
      code: `[ApiController]
[Route("api/billing/webhook")]
public class BillingWebhookController : ControllerBase
{
    private readonly ISubscriptionService _subscriptions;
    private readonly string _webhookSecret;

    [HttpPost]
    public async Task<IActionResult> Handle()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var stripeEvent = EventUtility.ConstructEvent(
            json,
            Request.Headers["Stripe-Signature"],
            _webhookSecret
        );

        switch (stripeEvent.Type)
        {
            case Events.InvoicePaid:
                var invoice = stripeEvent.Data.Object as Invoice;
                await _subscriptions.MarkActiveAsync(invoice!.SubscriptionId);
                break;

            case Events.CustomerSubscriptionDeleted:
                var sub = stripeEvent.Data.Object as Subscription;
                await _subscriptions.CancelAsync(sub!.Id);
                break;
        }

        return Ok();
    }
}`,
    },
  },

  // ─── 6. ROOMATY ───────────────────────────────────────────────
  {
    id: 'roomaty',
    title: 'Roomaty – Real-Time Social Room App',
    slug: 'roomaty',
    category: 'Mobile & Real-Time Apps',
    featured: true,
    gallery: [asset('/images/roomaty-room-image.jpeg'), asset('/images/roomaty-tasks.jpeg')],
    summary:
      'Contributed to Roomaty, a room-based social platform with live voice rooms, reward systems, gifting animations, and real-time interactions. Built on Flutter with FlutterFlow design scaffolding.',
    role: 'Mobile Developer',
    stack: ['Flutter', 'Dart', 'FlutterFlow', 'Real-Time APIs', 'State Management'],
    problem:
      'The app required a complex real-time interaction model: voice rooms, animated gifts that appear globally across rooms, a tiered reward system, daily task logic, and profile/settings management, all within a high-performance, animated mobile UI.',
    solution:
      'Used FlutterFlow for rapid UI scaffolding, then extended it with custom Dart logic for the reward engine, gift animation sequencer, real-time event handling, and room participation flows.',
    features: [
      'Real-time voice room join/leave and participant management',
      'Gifting system: animated gift sequences using multi-frame image stacking',
      'Global gift visibility: large gifts broadcast across all active rooms',
      'Reward system with point accumulation and tier progression',
      'Daily tasks engine with streak tracking and completion states',
      'Profile settings: avatar, display name, privacy toggles',
      'Room discovery and featured rooms section',
    ],
    technicalDetails:
      'Gift animations were implemented as frame-sequence players using a list of image assets with controlled timing intervals, mimicking sprite animation without a dedicated engine. The global gift broadcast used a pub/sub event bus to push events across room contexts. The daily task engine was a state machine with persistence via local storage and server sync on app foreground.',
    outcome:
      'Roomaty shipped with all targeted social features. The gifting animation system became one of the app\'s defining visual interactions, receiving strong user engagement metrics.',
    diagram: {
      title: 'Room & Gift Event Flow',
      code: `flowchart TD
    A[User sends Gift] -->|Gift event| B(Room Event Bus)
    B --> C{Gift size tier}
    C -->|Standard| D[Local Room Animation]
    C -->|Large / Mega| E[Global Broadcast]
    E --> F[All Active Rooms]
    F --> G[Animate gift overlay]
    D --> G
    G --> H[Increment sender points]
    H --> I{Reward tier check}
    I -->|Threshold met| J[Unlock new tier badge]
    I -->|Below threshold| K[Update progress bar]`,
    },
    codeSnippet: {
      language: 'dart',
      label: 'Global Gift Event Orchestrator (Flutter/Dart)',
      code: `class GiftEventOrchestrator {
  final _inbound = StreamController<GiftEvent>.broadcast();
  final _outbound = StreamController<GiftRenderJob>.broadcast();
  final _dedupe = <String, DateTime>{};

  // Limits simultaneous high-tier gift animations to protect FPS.
  int _activeGlobalAnimations = 0;
  static const int _maxGlobalAnimations = 2;

  Stream<GiftRenderJob> get renderJobs => _outbound.stream;

  void push(GiftEvent event) => _inbound.add(event);

  void start() {
    _inbound.stream.listen((event) async {
      // 1) Idempotency guard (events can arrive multiple times in flaky networks)
      if (_isDuplicate(event.id)) return;

      // 2) Build a deterministic render priority
      final priority = switch (event.tier) {
        GiftTier.mega => 0,
        GiftTier.large => 1,
        GiftTier.standard => 2,
      };

      // 3) Back-pressure: defer heavy global animations when cap is reached
      if (event.scope == GiftScope.global && _activeGlobalAnimations >= _maxGlobalAnimations) {
        await Future.delayed(const Duration(milliseconds: 220));
      }

      if (event.scope == GiftScope.global) _activeGlobalAnimations++;

      _outbound.add(
        GiftRenderJob(
          eventId: event.id,
          roomIds: event.scope == GiftScope.global ? event.activeRoomIds : [event.roomId],
          spriteSheet: event.spriteSheet,
          audioCue: event.audioCue,
          priority: priority,
          onComplete: () {
            if (event.scope == GiftScope.global) {
              _activeGlobalAnimations = (_activeGlobalAnimations - 1).clamp(0, _maxGlobalAnimations);
            }
          },
        ),
      );
    });
  }

  bool _isDuplicate(String eventId) {
    final now = DateTime.now();
    final seen = _dedupe[eventId];
    if (seen != null && now.difference(seen).inSeconds < 15) return true;
    _dedupe[eventId] = now;
    return false;
  }

  void dispose() {
    _inbound.close();
    _outbound.close();
  }
}`,
    },
  },

  // ─── 7. AI FINANCIAL CHAT APP ─────────────────────────────────
  {
    id: 'ai-financial-chat',
    title: 'AI Financial Chat App',
    slug: 'ai-financial-chat',
    category: 'Data & AI Products',
    featured: true,
    summary:
      'Built a Flutter application that delivers expert-level financial conversations powered by the OpenAI API, with separate chat contexts for different financial instruments: stocks, forex, crypto, and commodities.',
    role: 'Mobile & AI Integration Developer',
    stack: ['Flutter', 'Dart', 'OpenAI API', 'State Management'],
    problem:
      'Users needed a structured way to access expert-level financial guidance across multiple asset classes without switching tools or losing context. Generic AI chat was too unfocused for instrument-specific questions.',
    solution:
      'Designed an app where each financial instrument has its own expert chat context with a tailored system prompt and conversation history. Manual routing logic ensures the right expert persona handles each chat session.',
    features: [
      'Separate chat personas for: stocks, forex, cryptocurrency, and commodities',
      'OpenAI API integration with streaming responses',
      'Manual routing logic: chat selection → expert system prompt injection',
      'Conversation history management per instrument channel',
      'Clean chat UI with message bubbles, typing indicators, and smooth scrolling',
      'Instrument selector with icon-based navigation',
    ],
    technicalDetails:
      'Each expert channel is initialized with a crafted system prompt that establishes the AI persona and domain scope. Message history is maintained in a per-channel list and sent as part of each API request to maintain context. The OpenAI response is streamed using the HTTP streaming API and rendered token by token into the chat bubble.',
    outcome:
      'A focused, credible financial assistant experience that keeps conversations relevant and contextual per instrument type.',
    diagram: {
      title: 'AI Chat Routing Flow',
      code: `flowchart TD
    A[User opens app] --> B[Select instrument]
    B --> C{Channel type}
    C -->|Stocks| D[Stocks Expert Context]
    C -->|Forex| E[Forex Expert Context]
    C -->|Crypto| F[Crypto Expert Context]
    C -->|Commodities| G[Commodities Expert Context]
    D & E & F & G --> H[Inject system prompt]
    H --> I[Append user message to history]
    I --> J[POST /v1/chat/completions]
    J -->|Streaming response| K[Token-by-token render]
    K --> L[Update conversation history]`,
    },
    codeSnippet: {
      language: 'dart',
      label: 'Resilient Multi-Channel OpenAI Stream Handler (Dart)',
      code: `Future<void> sendInstrumentMessage({
  required InstrumentChannel channel,
  required String userMessage,
  required String apiKey,
}) async {
  final history = _channelHistory[channel] ?? <Map<String, String>>[];
  final requestId = const Uuid().v4();

  // Optimistic local write
  history.add({'role': 'user', 'content': userMessage});
  _channelHistory[channel] = history;
  _pushUiState(channel, ChatState.streaming(requestId));

  final request = http.Request(
    'POST',
    Uri.parse('https://api.openai.com/v1/chat/completions'),
  )
    ..headers.addAll({
      'Authorization': 'Bearer $apiKey',
      'Content-Type': 'application/json',
      'X-Request-ID': requestId,
    })
    ..body = jsonEncode({
      'model': 'gpt-4o',
      'stream': true,
      'messages': [
        {'role': 'system', 'content': _promptByChannel(channel)},
        ...history,
      ],
      'temperature': 0.3,
    });

  final streamed = await _http.send(request);
  if (streamed.statusCode >= 400) {
    _pushUiState(channel, ChatState.error('OpenAI rejected request (\${streamed.statusCode}).'));
    return;
  }

  final assistantBuffer = StringBuffer();
  await for (final line in streamed.stream.transform(utf8.decoder).transform(const LineSplitter())) {
    if (!line.startsWith('data: ') || line == 'data: [DONE]') continue;

    final payload = jsonDecode(line.substring(6)) as Map<String, dynamic>;
    final delta = payload['choices']?[0]?['delta']?['content'] as String?;
    if (delta == null || delta.isEmpty) continue;

    assistantBuffer.write(delta);
    _appendPartialAssistantMessage(channel, requestId, assistantBuffer.toString());
  }

  final assistantReply = assistantBuffer.toString().trim();
  if (assistantReply.isEmpty) {
    _pushUiState(channel, ChatState.error('No response content received.'));
    return;
  }

  history.add({'role': 'assistant', 'content': assistantReply});
  _channelHistory[channel] = _trimHistory(history, maxMessages: 20);
  _pushUiState(channel, ChatState.idle());
}`,
    },
  },

  // ─── 8. ORDER NOTIFICATION AUTOMATION ────────────────────────
  {
    id: 'order-notifications',
    title: 'Order Status Notification Automation',
    slug: 'order-status-notifications',
    category: 'Internal Tools & Automation',
    featured: false,
    summary:
      'Built an internal desktop app for Farhood Group that monitors an Excel order sheet for status changes and dispatches SMS or WhatsApp notifications to customers, with manual approval gates for sensitive updates.',
    role: 'Automation & Tools Developer',
    stack: ['Python', 'Tkinter', 'Twilio', 'openpyxl', 'Excel'],
    problem:
      'Order status updates were communicated manually via phone or WhatsApp, consuming staff time and introducing delays. There was no automated connection between the internal Excel tracking sheet and customer-facing communication.',
    solution:
      'Built a Tkinter desktop app that watches the Excel sheet for row changes, parses new status values, and surfaces them for review. Staff approve notifications before dispatch, and the app sends SMS or WhatsApp messages via Twilio with one click.',
    features: [
      'Excel sheet polling with row diff detection on status column',
      'Staff approval screen: shows pending notification queue',
      'One-click Twilio SMS or WhatsApp dispatch per notification',
      'Template-based message generation with customer name and order details',
      'Notification log with timestamp and channel used',
      'Configurable polling interval and column mapping',
    ],
    technicalDetails:
      'openpyxl reads the Excel file on a configurable interval and diffs the status column against an in-memory snapshot. Changes are added to a pending queue shown in the Tkinter UI. Each queue item shows the customer phone, current status, and a preview of the message template. Twilio\'s REST API handles both SMS and WhatsApp channels through a unified sending function.',
    outcome:
      'Reduced manual customer communication effort by over 80%. Staff found the approval-first design intuitive; it preserved oversight without requiring manual message writing.',
    diagram: {
      title: 'Excel Notification Workflow',
      code: `flowchart TD
    A[Excel Order Sheet] -->|Polling interval| B[Python Monitor]
    B -->|Detect status change| C{New status found?}
    C -->|No| A
    C -->|Yes| D[Add to approval queue]
    D --> E[Tkinter UI - Staff Review]
    E -->|Approve| F[Generate message template]
    E -->|Skip| A
    F --> G{Channel}
    G -->|SMS| H[Twilio SMS API]
    G -->|WhatsApp| I[Twilio WhatsApp API]
    H & I --> J[Customer receives notification]
    J --> K[Log entry created]`,
    },
    codeSnippet: {
      language: 'python',
      label: 'Approval Queue & Dispatch (Python)',
      code: `import openpyxl
from twilio.rest import Client

class OrderNotifier:
    def __init__(self, sheet_path: str, twilio_client: Client):
        self.sheet_path = sheet_path
        self.client = twilio_client
        self._snapshot: dict[str, str] = {}

    def poll(self) -> list[dict]:
        """Return rows whose status changed since last poll."""
        wb = openpyxl.load_workbook(self.sheet_path, data_only=True)
        ws = wb.active
        pending = []
        for row in ws.iter_rows(min_row=2, values_only=True):
            order_id, customer, phone, status = row[0], row[1], row[2], row[3]
            if self._snapshot.get(order_id) != status:
                pending.append({'order_id': order_id, 'customer': customer,
                                 'phone': phone, 'status': status})
                self._snapshot[order_id] = status
        return pending

    def dispatch(self, item: dict, channel: str = 'sms') -> str:
        msg = f"Hi {item['customer']}, your order #{item['order_id']} is now: {item['status']}."
        to = f"whatsapp:{item['phone']}" if channel == 'whatsapp' else item['phone']
        self.client.messages.create(body=msg, from_=FROM_NUMBER, to=to)
        return f"Sent via {channel} to {item['phone']}"`,
    },
  },

  // ─── 9. ODOO CRM AUTOMATION ───────────────────────────────────
  {
    id: 'odoo-crm',
    title: 'Odoo CRM Lead Automation',
    slug: 'odoo-crm-lead-automation',
    category: 'Internal Tools & Automation',
    featured: false,
    summary:
      'Established Odoo CRM for Farhood Group and developed a custom Odoo plugin to automatically convert website contact form submissions into structured CRM leads.',
    role: 'CRM Developer & Systems Integrator',
    stack: ['Odoo', 'Python', 'XML', 'PostgreSQL', 'CRM'],
    problem:
      'Website contact form submissions were arriving as plain emails, requiring manual CRM data entry. Lead data was unstructured and sales follow-up was delayed and inconsistent.',
    solution:
      'Configured Odoo CRM with a custom pipeline structure matching the sales process, then developed an Odoo module that listens for inbound form submissions and creates formatted CRM lead records automatically.',
    features: [
      'Odoo CRM pipeline setup with custom stages matching sales workflow',
      'Custom Odoo module: form-to-lead conversion plugin',
      'Automatic lead creation with source, name, phone, email, and message fields',
      'Lead tagging by form source for reporting and routing',
      'Salesperson auto-assignment rules by lead type',
      'Real-time notification to assigned salesperson on new lead creation',
    ],
    technicalDetails:
      'The module uses Odoo\'s built-in `crm.lead` model and extends it with a custom webhook controller. Incoming POST requests from website forms are parsed, validated, and mapped to Odoo lead fields. The module is packaged as a standard Odoo add-on with manifest, model extension, and controller definition.',
    outcome:
      'Zero manual CRM data entry for website-generated leads. Response time to leads dropped significantly as salespersons received instant in-app notifications on new enquiries.',
    diagram: {
      title: 'Odoo Lead Automation Flow',
      code: `flowchart TD
    A[Website Contact Form] -->|HTTP POST| B[Odoo Webhook Controller]
    B -->|Parse & validate fields| C{Validation}
    C -->|Invalid| D[Log error & discard]
    C -->|Valid| E[Map to crm.lead fields]
    E --> F[Create lead record in Odoo]
    F --> G[Apply source tag & routing rule]
    G --> H{Auto-assign salesperson?}
    H -->|Yes| I[Assign & notify salesperson]
    H -->|No| J[Add to unassigned queue]
    I & J --> K[Lead visible in CRM pipeline]`,
    },
  },

  // ─── 10. INSTACHAT ────────────────────────────────────────────
  {
    id: 'instachat',
    title: 'InstaChat',
    slug: 'instachat',
    category: 'Mobile & Real-Time Apps',
    featured: false,
    summary:
      'A personal project exploring an alternative real-time messaging application concept, focused on clean UX, fast message delivery, and a modern communication experience.',
    role: 'Product Designer & Developer',
    stack: ['Flutter', 'Dart', 'Firebase', 'Real-Time Database'],
    problem:
      'Existing messaging apps carry legacy UI patterns and feature bloat. This project was a personal exploration of what a focused, minimal, and visually clean messaging experience could look like when built from scratch.',
    solution:
      'Designed and prototyped a messaging application with a clean UI, real-time message sync via Firebase, and a streamlined conversation model, stripping away non-essential features to focus on the core communication experience.',
    features: [
      'Real-time message delivery with Firebase Realtime Database',
      'Clean, minimal conversation list and chat UI',
      'Read receipts and online presence indicators',
      'Media message support (images)',
      'User profile setup with avatar and display name',
      'Push notification integration for new messages',
    ],
    technicalDetails:
      'Firebase Realtime Database handles message sync with optimistic local writes for perceived instant delivery. Firebase Auth handles user identity. The UI follows a strict design system with limited color usage to maintain the minimal aesthetic.',
    outcome:
      'A functional messaging prototype demonstrating strong product design thinking and end-to-end mobile development capability. Served as a technical sandbox for exploring real-time Flutter patterns.',
  },
];

// ---------------------------------------------------------------
export const categories: Category[] = [
  'Business Websites',
  'Internal Tools & Automation',
  'E-Commerce & Billing',
  'Mobile & Real-Time Apps',
  'Data & AI Products',
];

export const featuredProjects = projects.filter((p) => p.featured);

function normalizeSlug(value: string): string {
  return decodeURIComponent(value).trim().replace(/\s+/g, '-').toLowerCase();
}

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = normalizeSlug(slug);
  return projects.find(
    (p) => normalizeSlug(p.slug) === normalized || normalizeSlug(p.id) === normalized,
  );
}