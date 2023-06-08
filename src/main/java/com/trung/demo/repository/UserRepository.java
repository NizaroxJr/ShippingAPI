

package com.trung.demo.repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.trung.demo.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
	User findByEmail(String email);
	boolean existsByEmail(String email);
}
