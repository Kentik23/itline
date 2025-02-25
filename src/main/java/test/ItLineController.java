package test;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/itline")
public class ItLineController {

    private final ItemService itemService;

    public ItLineController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public String getItems(Model model) {
        model.addAttribute("items", itemService.getAllItems());
        return "index";
    }

    @PostMapping()
    @ResponseBody
    public Item addItem(@RequestBody Item item) {
        return itemService.save(item);
    }

    @PatchMapping("{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {
        boolean newStatus = request.get("active");
        itemService.updateStatus(id, newStatus);
        return ResponseEntity.ok(Map.of("success", true, "active", newStatus));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        itemService.detete(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
