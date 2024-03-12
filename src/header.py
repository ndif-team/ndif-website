
def header():
    global pathname
    def nav_link(text, link):
        classes = ' border rounded-pill' if text == 'Get Involved' else ''
        attributes = ''
        if link == pathname or link == '/' and pathname == '/index.html':
            classes += ' active'
            attributes = ' aria-current="page"'
        return f'<a class="nav-link text-secondary{classes}"{attributes} href="{link}">{text}</a>'

    return f"""\
<!doctype html>
<html lang="en" data-bs-theme="light">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<title>National Deep Inference Fabric</title>

<!-- Bootstrap CSS Imports -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

<!-- Google Font Imports -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
rel="stylesheet">

<!-- Custom CSS Imports -->
<link rel="stylesheet" href="./css/main.css">
<link rel="stylesheet" href="./css/home.css">
<link rel="stylesheet" href="./css/custom.css">

</head>

<body>

<header class="pb-3 pt-4">
<div class="container col-xxl-8">
<div class="row align-items-center">
<div class="col-md-4 text-start">
<a href="./" style="color: inherit; text-decoration: none;">
<div class="row align-items-center">
<div class="col-md-4 border-end px-0">
<img src="./images/NDIF_Acr_color.png" class="d-block img-fluid" width="100"
height="100" loading="lazy">
</div>
<div class="col-md-8 my-auto">
<h4 style="margin-bottom: 0 !important; color: #656565; margin-bottom: 0 !important; font-size: 22px; line-height: 0.9; font-weight: 700 !important;" class="fw-semibold">
National Deep<br />Inference Fabric
</h4>
</div>
</div>
</a>
</div>
<div class="col-md-8 align-items-center justify-content-end d-flex">
<ul class="nav navbar-light p-1" style="display: inline-flex;">
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
</div>
</div>
</div>
</header>
"""
