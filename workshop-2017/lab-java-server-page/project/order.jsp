<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="model.ProductBean"%>
<%@page import="model.CustomerBean"%>
<%@ page import="java.util.ArrayList"%>
<!DOCTYPE html>
<html>

<head>
	<title>VIEW</title>
	<meta charset="UTF-8">
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">

	<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700">
	<link rel="stylesheet" href="vendor/bootstrap-select/css/bootstrap-select.min.css">
	<link rel="stylesheet" href="vendor/owl.carousel/assets/owl.carousel.css">
	<link rel="stylesheet" href="vendor/owl.carousel/assets/owl.theme.default.css">
	<link rel="stylesheet" href="css/style.default.css" id="theme-stylesheet">
	<link rel="stylesheet" href="css/custom.css">

	<link href="https://fonts.googleapis.com/css?family=Alegreya+Sans+SC" rel="stylesheet">
</head>

<body>
	<% ProductBean bean = (ProductBean) session.getAttribute("productbean"); %>
	<% CustomerBean customerbean = (CustomerBean) session.getAttribute("customerbean"); %>
	<div id="all">
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
								Welcome! ${name} <a href="LoginServlet?page=order.jsp&productid=<%=bean.getProductid() %>" class="login-btn">
									<span class="d-none d-md-inline-block" style="margin-left: 25px">Log Out</span> <i class="fa fa-sign-in"></i>
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
						<form action="LoginServlet?page=order.jsp&productid=<%= bean.getProductid() %>" method="post">
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
							<li class="nav-item dropdown"><a href="#contact" class="nav-link">CONTACT</a></li>
						</ul>
					</div>

				</div>
			</div>
		</header>
		<!-- ===========================-->

		<div id="heading-breadcrumbs">
			<div class="container">
				<div class="row d-flex align-items-center flex-wrap">
					<div class="col-md-9">
						<h1 class="h2">
							<%=bean.getProductname() %>
						</h1>
					</div>
				</div>
			</div>
		</div>
		<div id="content">
			<div class="container">
				<div class="row bar">
					<!-- LEFT COLUMN _________________________________________________________-->
					<div class="col-lg-12">
						<div id="productMain" class="row">
							<div class="col-sm-8">
								<div data-slider-id="1" class="owl-carousel shop-detail-carousel">
									<div>
										<img src="data:image/jpeg;base64,<%= bean.getImgData() %>" class="img-fluid">
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="box">
									<p class="price">฿
										<%=bean.getUnitprice() %>
									</p>
									<p class="text-center">
										<% if(customerbean != null){ %>
										<a href="BuyServlet?productid=<%=bean.getProductid() %>&customerid=<%=customerbean.getCustomerid() %>" class="btn btn-template-outlined">
											<i class="fa fa-shopping-cart"></i> BUY NOW!</a>
									</p>
									<% } else { %>
									<a href="#" data-toggle="modal" data-target="#login-modal" class="login-btn"> <span class="btn btn-template-outlined"><i
											 class="fa fa-sign-in"></i> Please sign in to make a transaction </span>
									</a>
									<% } %>
								</div>
							</div>
						</div>
						<div id="details" class="box mb-12 mt-12">
							<p></p>
							<h4>Product details</h4>
							<ul>
								<%=bean.getDetail() %>
							</ul>
						</div>

						<div class="row">
							<div class="col-lg-3 col-md-6">
								<div class="box text-uppercase mt-0 mb-small">
									<h3>You may also like these products</h3>
								</div>
							</div>
							<%
								ArrayList<ProductBean> klist = (ArrayList<ProductBean>) session.getAttribute("k_list");
								ProductBean kbean;
								for(int i=0 ; i < klist.size() ; i++) {
								kbean = (ProductBean) klist.get(i);
							%>
							<div class="col-lg-3 col-md-6">
								<div class="product">
									<div class="image">
										<a href="OrderServlet?productid=<%=kbean.getProductid() %>"> <img src="data:image/jpeg;base64,<%= kbean.getImgData() %>"
											 class="img-fluid image1">
										</a>
									</div>
									<div class="text">
										<h3 class="h5">
											<a href="shop-detail.html">
												<%=kbean.getProductname() %></a>
										</h3>
										<p class="price">
											<%=kbean.getUnitprice() %>
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

					<div class="col-lg-4">
						<h4 class="h6" id="contact">Contact</h4>
						<p class="text-uppercase">
							Maejo Universal LTD.<br>Nhonghan<br>Sansai<br>Chiangmai<br>50290<br>Thailand
							<br>
						</p>
						TEL. 0123456789
					</div>
				</div>
			</div>

			<!------------------------------------------>
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
	</div>

	<!-- Javascript files-->
	<script src="vendor/jquery/jquery.min.js"></script>
	<script src="vendor/popper.js/umd/popper.min.js"> </script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
	<script src="vendor/jquery.cookie/jquery.cookie.js"> </script>
	<script src="vendor/waypoints/lib/jquery.waypoints.min.js"> </script>
	<script src="vendor/jquery.counterup/jquery.counterup.min.js"> </script>
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