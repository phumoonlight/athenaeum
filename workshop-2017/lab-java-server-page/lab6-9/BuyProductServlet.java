package control;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.ProductBean;
import service.ProductDAO;

@WebServlet("/BuyProductServlet")
public class BuyProductServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public BuyProductServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		HttpSession session = request.getSession(true);
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		
		int orderid = 0;
		String customername;
		String page;
		ProductBean bean = null;
		ProductDAO dao = new ProductDAO();
		
		int productid = Integer.parseInt(request.getParameter("productid"));
		int quantity = Integer.parseInt(request.getParameter("quantity"+productid));
		
		try {
			bean = dao.getProduct(productid);
			session.setAttribute("category_id", bean.getCategoryID());
			session.setAttribute("product_name", bean.getProductName());
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		
		if (quantity == 0) {
			page = "alert.jsp";
			session.setAttribute("alert", "Cannot Buy due 0 quantity");
		} else {
			try {
				orderid = dao.buyProduct(bean,quantity);
				customername = dao.getCustomerName(orderid);
				//------------------------------------------------------------------//
				session.setAttribute("customer_name", customername);
				session.setAttribute("total_price", (bean.getUnitPrice()*quantity));
				session.setAttribute("quantity", quantity);
				session.setAttribute("order_id", orderid);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			page = "orderreport.jsp";
		}
		response.sendRedirect(page);
	}
}
