package com.jabeklah.shipping.model;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class Consignment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	@Getter @Setter
	private int id;
	
	@Column(name = "description")
	@Getter @Setter
	private String description;
	
	@Column(name = "street")
	@Getter @Setter
	private String street;
	
	@Column(name = "city")
	@Getter @Setter
	private String city;
	
	@Column(name = "state")
	@Getter @Setter
	private String state;
	
	@Column(name = "zipcode")
	@Getter @Setter
	private int zipcode;
	
	@Column(name = "country")
	@Getter @Setter
	private String country;
	
	@Column(name="price")
	@Getter @Setter
	private double price;
	
	@Column(name="currency")
	@Getter @Setter
	private String currency;
	
	@ManyToOne(fetch = FetchType.EAGER, targetEntity=User.class)
	@JoinColumn(name="owner_email", nullable=false)
	@Setter
	private User user;
	
	@Column(name="owner_name", nullable=false)
	@Getter @Setter
	private String ownerName;
		
	@Column(name="assigned_user_name", nullable=true)
	@Getter @Setter
	private String assignedUserName;
	
	@ManyToOne(fetch = FetchType.EAGER, targetEntity=User.class)
	@JoinColumn(name="assignedEmployee_email", nullable=true)
	@Setter
	private User assignedEmployee;
	
	@Column(name = "received")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	@Getter @Setter
	private boolean received;
	
	
	public Consignment() { }


	public Consignment(String description, String street, String city, String state, int zipcode,
			String country, double price, String currency) {
		super();
		this.description = description;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zipcode = zipcode;
		this.country = country;
		this.price = price;
		this.currency = currency;
	}	
	
}
