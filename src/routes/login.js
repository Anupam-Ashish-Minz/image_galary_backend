import { Router } from 'express';
import passport from 'passport';

const router = Router();

// replace with frontend
router.get("/login", (_req, res) => {
    res.send("login");
});

// replace with frontend
router.get("/profile", (_req, res) => {
    res.send("profile");
});

router.post("/login", passport.authenticate('local', {failureRedirect: "/login"}), (_req, res) => {
    res.redirect("/profile");
});

router.get("/api/logged_in_user", (req, res) => {
    if (!req.user) {
        res.redirect("/login");
    }
    res.json(req.user);
});

router.get("/api/login_status", (req, res) => {
    res.send(req.isAuthenticated());
});

router.post("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export { router };
