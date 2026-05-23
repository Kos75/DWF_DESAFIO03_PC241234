package sv.edu.udb.sistemaescolar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistemaescolar.entity.Usuario;
import sv.edu.udb.sistemaescolar.security.JwtTokenUtil;
import sv.edu.udb.sistemaescolar.service.AuthService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenUtil jwtTokenUtil;
    @Autowired private UserDetailsService userDetailsService;
    @Autowired private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> authenticationRequest) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.get("username"), authenticationRequest.get("password")));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.get("username"));
        final String token = jwtTokenUtil.generateToken(userDetails);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("username", userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        if (authService.buscarPorUsername(usuario.getUsername()).isPresent()) {
            Map<String, String> res = new HashMap<>();
            res.put("error", "El nombre de usuario ya existe.");
            return ResponseEntity.badRequest().body(res);
        }
        return ResponseEntity.ok(authService.registrar(usuario));
    }
}