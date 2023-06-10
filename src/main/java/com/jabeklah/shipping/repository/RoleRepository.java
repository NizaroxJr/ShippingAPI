package com.jabeklah.shipping.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jabeklah.shipping.model.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, String> {
	Role findByRole(String role);
}
