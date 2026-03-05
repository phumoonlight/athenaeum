package control;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.ProductBean;
import service.ProductDAO;

@WebServlet("/BuyServlet")
public class BuyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public BuyServlet() {
        super();   
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ProductDAO dao = new ProductDAO();
		String productid = request.getParameter("productid");
		String customerid = request.getParameter("customerid");
		try {
			dao.buyProducts(Integer.parseInt(productid), Integer.parseInt(customerid));
			response.sendRedirect("OrderServlet?productid="+productid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
