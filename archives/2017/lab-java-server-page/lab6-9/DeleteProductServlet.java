package control;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.ProductBean;
import service.ProductDAO;

@WebServlet("/DeleteProductServlet")
public class DeleteProductServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public DeleteProductServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		//-----------------------------------------------------------//
		HttpSession session = request.getSession(true);
		ProductDAO dao = new ProductDAO();
		ProductBean bean = null;
		int result;
		//-----------------------------------------------------------//
		String productid = request.getParameter("productid");
		String categoryid = request.getParameter("categoryid");
		//-----------------------------------------------------------//
		try {
			bean = dao.getProduct(Integer.parseInt(productid));
		} catch (Exception e) {
			e.printStackTrace();
		}
		//-----------------------------------------------------------//
		result = dao.deleteProduct(productid);
		//-----------------------------------------------------------//
		request.setAttribute("product_name", bean.getProductName());
		session.setAttribute("category_id", categoryid);	
		//-----------------------------------------------------------//
		if (result > 0) {
			session.setAttribute("alert", "Delete Successful");
		} else {
			session.setAttribute("alert", "Cannot Delete");	
		}
		//-----------------------------------------------------------//
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/alert.jsp");
		dispatcher.forward(request, response);
	}
}
