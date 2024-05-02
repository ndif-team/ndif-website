
def header():
    global pathname
    def nav_link(text, link):
        classes = ' no-border-md-down border rounded-pill action-button' if text == 'Get Involved' else ''
        attributes = ''
        if link == pathname or link == '/' and pathname == '/index.html':
            classes += ' active'
            attributes = ' aria-current="page"'
        return f'<a class="nav-link text-secondary{classes}"{attributes} href=".{link}">{text}</a>'

    return f"""\
<!doctype html>
<html lang="en" data-bs-theme="light">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>National Deep Inference Fabric</title>
<meta name="description" content="National Deep Inference Fabric" />
<meta property="og:title" content="National Deep Inference Fabric" />
<meta property="og:url" content="https://ndif.us/" />
<meta property="og:image" content="https://ndif.us/images/NDIF_Acr_color.png" />
<meta property="og:description" content="NDIF is a research computing project that enables researchers and students to crack open the mysteries inside large-scale AI systems." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="National Deep Inference Fabric" />
<meta name="twitter:description" content="NDIF is a research computing project that enables researchers and students to crack open the mysteries inside large-scale AI systems." />
<meta name="twitter:image" content="https://ndif.us/images/NDIF_Acr_color.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
<link rel="icon" type="image/x-icon" href="/favicon.ico">

<!-- Bootstrap CSS Imports -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- Google Font Imports -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
rel="stylesheet">

<!-- Custom CSS Imports -->
<link rel="stylesheet" href="./css/home.css">
<link rel="stylesheet" href="./css/custom.css">
<link rel="stylesheet" href="./css/mobile.css">

<!-- Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NQV89E9KBS"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'G-NQV89E9KBS');
</script>

<body>

<header class="pb-3 pt-4">
    <div class="container col-xxl-8 px-5 px-lg-0">
        <div class="row align-items-center">
            <div class="col-4 text-start">
                <a href="./" style="color: inherit; text-decoration: none;">
                    <div class="row align-items-center">
                        <div class="col-lg-3 border-end no-border-md-down ps-0">
                            <img src="./images/NDIF_Acr_color.png" class="d-block img-fluid" width="100" height="100"
                                loading="lazy">
                        </div>
                        <div class="col-md-9 my-auto d-none d-lg-block">
                            <h5 style="margin-bottom: 0 !important; color: #656565; margin-bottom: 0 !important; line-height: 0.9; font-weight: 700 !important;">
                                National Deep<br />Inference Fabric
                            </h6>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-8 align-items-center justify-content-end d-flex">

                <ul class="nav navbar-light p-1 d-none d-md-flex">
                    <li class="nav-item">
                        {nav_link('Home', '/')}
                    </li>
                    <li class="nav-item">
                        {nav_link('Fabric', '/fabric.html')}
                    </li>
                    <li class="nav-item me-2">
                        {nav_link('About Us', '/about.html')}
                    </li>
                    <li class="nav-item">
                        {nav_link('Get Involved', '/start.html')}
                    </li>
                </ul>
                
                <button class="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon">
                        <i style="font-size: 2rem;" class="bi bi-list"></i>
                    </span>
                </button>

            </div>
        </div>
    </div>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li>{nav_link('Home', '/')}</li>
                <li>{nav_link('Fabric', '/fabric.html')}</li>
                <li>{nav_link('About Us', '/about.html')}</li>
                <li>{nav_link('Get Involved', '/start.html')}</li>
            </ul>
        </div>
    </div>
</header>
"""
