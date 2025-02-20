package test;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ItLineController {
    @RequestMapping("/itline")
    public String index() {
        return "index";
    }
}
