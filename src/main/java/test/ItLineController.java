package test;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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

    @PostMapping("/add")
    @ResponseBody
    public Item addItem(@RequestBody Item item) {
        itemService.save(item); // Сохраняем в БД
        return item; // Возвращаем объект для обновления таблицы
    }
}
