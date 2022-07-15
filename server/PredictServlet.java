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

@WebServlet("/predict")
public class PredictServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
	private static final String USER = "root";
	private static final String PASSWORD = "1234";	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection con = null;
		PreparedStatement stmt = null;
		
		String doc_id = request.getParameter("doc_id");
		String aging_bucket = request.getParameter("aging_bucket");
		
		HashMap<Object, Object> Response = new HashMap<Object, Object>();
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection(DB_URL, USER, PASSWORD);
			
			stmt = con.prepareStatement(
						"UPDATE winter_internship "
						+ "SET aging_bucket= (?) "
						+ "WHERE doc_id = (?);"					
					);
			stmt.setString(1, aging_bucket);
			stmt.setString(2, doc_id);
			
			int row = stmt.executeUpdate();
			
			if(row > 0) {
				Response.put("updated", true);
			}
			else {
				Response.put("updated", false);
			}
			
			Gson gson = new Gson();
	         String JSONresponse = gson.toJson(Response);
	         response.setHeader("Access-Control-Allow-Origin", "*");
	         response.getWriter().append(JSONresponse);  

		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

}


//
//UPDATE winter_internship
//SET aging_bucket= '10-10'
//WHERE sl_no = 32;