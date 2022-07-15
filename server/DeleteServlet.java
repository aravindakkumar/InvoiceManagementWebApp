package com.highradius;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import com.google.gson.Gson;

/**
 * Servlet implementation class DeleteServlet
 */
@WebServlet("/del")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
	private static final String USER = "root";
	private static final String PASSWORD = "1234";
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int row = 0;
		HashMap<Object, Object> Response = new HashMap<Object,Object>();
		Connection con = null;
		PreparedStatement stmt = null;
		
		String sl_no = request.getParameter("sl_no");
//		UPDATE winter_internship
//		SET is_deleted= 1
//		WHERE sl_no = 48578;
		
//		"DELETE FROM winter_internship WHERE sl_no=?"
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection(DB_URL, USER, PASSWORD);
			stmt = con.prepareStatement(
					"UPDATE winter_internship "
					+ "SET is_deleted= 1 "
					+ "WHERE sl_no = (?)"
					);
			stmt.setString(1, sl_no);
			row = stmt.executeUpdate();
			if(row > 0) {
				Response.put("delete", true);
			}
			else {
				Response.put("delete", false);
			}
			 Gson gson = new Gson();
	         String JSONresponse = gson.toJson(Response);
	         response.setHeader("Access-Control-Allow-Origin", "*");
	         response.getWriter().append(JSONresponse);  
			
	         System.out.println("Deleted " + row);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
