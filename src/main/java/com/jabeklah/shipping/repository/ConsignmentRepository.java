package com.jabeklah.shipping.repository;

import org.springframework.data.repository.CrudRepository;

import com.jabeklah.shipping.model.Consignment;

public interface ConsignmentRepository extends CrudRepository<Consignment, Integer> {
	Consignment findById(int id);
}
