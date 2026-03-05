<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="model.ProductBean"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>STORE</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="robots" content="all,follow">
	<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700">
	<link rel="stylesheet" href="vendor/bootstrap-select/css/bootstrap-select.min.css">
	<link rel="stylesheet" href="vendor/owl.carousel/assets/owl.carousel.css">
	<link rel="stylesheet" href="vendor/owl.carousel/assets/owl.theme.default.css">
	<link rel="stylesheet" href="css/style.default.css" id="theme-stylesheet">
	<link rel="stylesheet" href="css/custom.css">
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	
	<link href="https://fonts.googleapis.com/css?family=Alegreya+Sans+SC" rel="stylesheet">
</head>
<style>

	.btn-search {
	  background: #424242;
	  border-radius: 0;
	  color: #fff;
	  border-width: 1px;
	  border-style: solid;
	  border-color: #1c1c1c;
	}
	.btn-search:link, .btn-search:visited {
	  color: #fff;
	}
	.btn-search:active, .btn-search:hover {
	  background: #1c1c1c;
	  color: #fff;
	}
    </style>

<body>
	<div id="all">
		<!-- Top bar-->
		<div class="top-bar">
			<div class="container">
				<div class="row d-flex align-items-center">
					<div class="col-md-6 d-md-block d-none"></div>
					<div class="col-md-6">
						<div class="d-flex justify-content-md-end justify-content-between">
							<div class="login">
								<div style="margin-right: 20px; color: red;">${error}</div>
								<%
									if (session.getAttribute("name") == null) {
								%>
								<a href="#" data-toggle="modal" data-target="#login-modal" class="login-btn"> <i class="fa fa-sign-in"></i>
									<span class="d-none d-md-inline-block"> Sign In </span>
								</a> <a href="customer-register.jsp" class="signup-btn"> <i class="fa fa-user"></i> <span class="d-none d-md-inline-block">
										Sign Up </span></a>
								<%
									} else {
								%>
								Welcome! ${name} <a href="LoginServlet?page=shop.jsp" class="login-btn"> <span class="d-none d-md-inline-block"
									 style="margin-left: 25px">Log Out</span> <i class="fa fa-sign-in"></i>
								</a>
								<%
									}
								%>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Top bar end-->
		<!-- Login Modal-->
		<div id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modalLabel" aria-hidden="true" class="modal fade">
			<div role="document" class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 id="login-modalLabel" class="modal-title">Customer Login</h4>
						<button type="button" data-dismiss="modal" aria-label="Close" class="close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">
						<form action="LoginServlet?page=shop.jsp" method="post">
							<div class="form-group">
								<input id="email_modal" name="email" type="text" maxlength="50" placeholder="email" class="form-control"
								 required>
							</div>
							<div class="form-group">
								<input id="password_modal" name="password" type="password" placeholder="password" class="form-control"
								 maxlength="20" required>
							</div>
							<p class="text-center">
								<input class="btn btn-template-outlined" value="log in" type="submit">
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!-- Login modal end-->
		<!-- Navbar Start-->
		<header class="nav-holder make-sticky">
			<div id="navbar" role="navigation" class="navbar navbar-expand-lg">
				<div class="container">
					<div style="font-family: 'Alegreya Sans SC', sans-serif; font-size: 25px;">
						<a href="index.jsp" class="navbar-brand home">
							<img src="img/logo.png" height="50px" class="d-none d-md-inline-block">
							<strong>HOME</strong>
						</a>
					</div>
					<button type="button" data-toggle="collapse" data-target="#navigation" class="navbar-toggler btn-template-outlined">
						<span class="sr-only">Toggle navigation</span><i class="fa fa-align-justify"></i>
					</button>
					<div id="navigation" class="navbar-collapse collapse">
						<ul class="nav navbar-nav ml-auto">


							<!-- ===========================-->
							<li class="nav-item dropdown"><a href="#contact" class="nav-link">CONTACT</a></li>
							<!-- ===========================-->
						</ul>
					</div>

				</div>
			</div>
		</header>
		<!-- ===========================-->

		<div id="heading-breadcrumbs">
			<div class="container">
				<div class="row d-flex align-items-center flex-wrap">
					<div class="col-md-3">
						<h1 class="h2">NOTEBOOK</h1>
					</div>
					<div class="col-md-9">
						<div class="container">
							<div class="input-group">
								<form action="SearchServlet" method="post" id="searchform">
									<input type="text" name="search" style="width: 350px;" class="form-control" placeholder="Search for...">
								</form>
								<span class="input-group-btn">
									<button class="btn btn-search" type="submit" form="searchform" value="Submit">
										<i class="fa fa-search fa-fw"></i> Search
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<% String category_id = (String) session.getAttribute("category_id"); %>
		<div id="content">
			<div class="container">
				<div class="row bar">
					<div class="col-md-3">
						<!-- MENUS AND FILTERS-->
						<div class="panel panel-default sidebar-menu">
							<div class="panel-heading">
								<h3 class="h4 panel-title">Categories</h3>
							</div>
							<div class="panel-body">
								<ul class="nav nav-pills flex-column text-sm category-menu">
									<% if(category_id.equals("99")) { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=99" class="active nav-link d-flex align-items-center justify-content-between">
											<span>ALL </span>
										</a>
									</li>
									<% } else { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=99" class="nav-link d-flex align-items-center justify-content-between">
											<span>ALL </span>
										</a>
									</li>
									<% } %>
									<% if(category_id.equals("1")) { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=1" class="active nav-link d-flex align-items-center justify-content-between">
											<span>ACER </span>
										</a>
									</li>
									<% } else { %>			
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=1" class="nav-link d-flex align-items-center justify-content-between">
											<span>ACER </span>
										</a>
									</li>
									<% } %>
									<% if(category_id.equals("2")) { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=2" class="active nav-link d-flex align-items-center justify-content-between">
											<span>ASUS </span>
										</a>
									</li>
									<% } else { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=2" class="nav-link d-flex align-items-center justify-content-between">
											<span>ASUS </span>
										</a>
									</li>
									<% } %>
									<% if(category_id.equals("3")) { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=3" class="active nav-link d-flex align-items-center justify-content-between">
											<span>HP </span>
										</a>
									</li>
									<% } else { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=3" class="nav-link d-flex align-items-center justify-content-between">
											<span>HP </span>
										</a>
									</li>
									<% } %>
									<% if(category_id.equals("7")) { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=7" class="active nav-link d-flex align-items-center justify-content-between">
											<span>DELL </span>
										</a>
									</li>
									<% } else { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=7" class="nav-link d-flex align-items-center justify-content-between">
											<span>DELL </span>
										</a>
									</li>
									<% } %>
									<% if(category_id.equals("4")) { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=4" class="active nav-link d-flex align-items-center justify-content-between">
											<span>MSI </span>
										</a>
									</li>
									<% } else { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=4" class="nav-link d-flex align-items-center justify-content-between">
											<span>MSI </span>
										</a>
									</li>
									<% } %>
									<% if(category_id.equals("5")) { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=5" class="active nav-link d-flex align-items-center justify-content-between">
											<span>LENOVO </span>
										</a>
									</li>
									<% } else { %>
									<li class="nav-item">
										<a href="CategoryServlet?categoryid=5" class="nav-link d-flex align-items-center justify-content-between">
											<span>LENOVO </span>
										</a>
									</li>
									<% } %>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-9">
						<div class="row products products-big">
							<%
								ArrayList<ProductBean> list = (ArrayList<ProductBean>) session.getAttribute("productlist");
								ProductBean bean;
								for(int i=0 ; i < list.size() ; i++) {
								bean = (ProductBean) list.get(i);
							%>
							<div class="col-lg-4 col-md-6">
								<div class="product">
									<div class="image">
										<a href="OrderServlet?productid=<%=bean.getProductid() %>">
											<img src="data:image/jpeg;base64,<%= bean.getImgData() %>" class="img-fluid image1">
										</a>
									</div>
									<div class="text">
										<h3 class="h5">
											<a href="OrderServlet?productid=<%=bean.getProductid() %>">
												<%=bean.getProductname() %>"</a>
										</h3>
										<p class="intro" style="color:gray; font-size: 75%;">
											<%=bean.getDetail() %>
										</p>
										<p class="price">
											฿
											<%=bean.getUnitprice() %>
										</p>
									</div>
								</div>
							</div>
							<% } %>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- FOOTER -->
	<footer class="main-footer">
		<div class="container">
			<div class="row">
				<div class="col-lg-4">
					<h4 class="h6">About Us</h4>
					<p>
						MAEJO UNIVERSITY <br> COMPUTER SCIENCE <br> SYSTEM
						ANALYSIS AND DESIGN<br> SECTION 2
					</p>

					<hr class="d-block d-lg-none">
				</div>
				<div class="col-lg-4">
					<h4 class="h6">Follow us</h4>
					<br>
					<ul class="list-unstyled footer-blog-list">
						<li class="d-flex align-items-center">
							<div class="text">
								<p class="mb-0">
									<a href="https://www.facebook.com/groups/655449861148442/" target="_blank"> <img src="https://orig00.deviantart.net/9245/f/2018/185/9/2/facebook_icon_by_hellomepuu-dcg9xur.png">
										Facebook page
									</a>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div id="contact" class="col-lg-4">
					<h4 class="h6">Contact</h4>
					<p class="text-uppercase">
						Maejo Universal LTD.<br>Nhonghan<br>Sansai<br>Chiangmai<br>50290<br>Thailand
						<br>
					</p>
					TEL. 0123456789
					<hr class="d-block d-lg-none">
				</div>
			</div>
		</div>
		<div class="copyrights">
			<div class="container">
				<div class="row">
					<div class="col-lg-4 text-center-md">
						<p>MAEJO UNIVERSITY / COMPUTER SCIENCE &copy; 2018</p>
					</div>
				</div>
			</div>
		</div>
	</footer>

	<script src="vendor/jquery/jquery.min.js"></script>
	<script src="vendor/popper.js/umd/popper.min.js">

	</script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
	<script src="vendor/jquery.cookie/jquery.cookie.js">

	</script>
	<script src="vendor/waypoints/lib/jquery.waypoints.min.js">

	</script>
	<script src="vendor/jquery.counterup/jquery.counterup.min.js">

	</script>
	<script src="vendor/owl.carousel/owl.carousel.min.js"></script>
	<script src="vendor/owl.carousel2.thumbs/owl.carousel2.thumbs.min.js"></script>
	<script src="js/jquery.parallax-1.1.3.js"></script>
	<script src="vendor/bootstrap-select/js/bootstrap-select.min.js"></script>
	<script src="vendor/jquery.scrollto/jquery.scrollTo.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBu5nZKbeK-WHQ70oqOWo-_4VmwOwKP9YQ"></script>
	<script src="js/gmaps.js"></script>
	<script src="js/gmaps.init.js"></script>
	<script src="js/front.js"></script>
</body>

</html>