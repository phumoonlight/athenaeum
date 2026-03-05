package cs.mju.mvc.test;
import java.sql.Connection;
import cs.mju.mvc.service.ConnectionManager;
public class TestConnect {
	public static void main(String[] args) {
		Connection conn = ConnectionManager.getConnection();
		System.out.println(conn.toString());
	}
}
