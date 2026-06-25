package control;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.ProductBean;
import service.ProductDAO;

@WebServlet("/OrderServlet")
public class OrderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public OrderServlet() {
        super();  
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = request.getSession(true);
			ProductDAO dao = new ProductDAO();
			
			ProductBean productbean;
			
			String productid = request.getParameter("productid");
			
			productbean = dao.getProducts(Integer.parseInt(productid));
			ArrayList<ProductBean> klist = dao.recommendProducts(Integer.parseInt(productid));
			session.setAttribute("k_list", klist);
			session.setAttribute("productbean", productbean);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			response.sendRedirect("order.jsp");
		}	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
}
