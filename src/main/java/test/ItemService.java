package test;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ItemService {
    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public List<Item> getAllItems() {
        return repository.findAll();
    }

    public Item save(Item item) {
        return repository.save(item);
    }

    public void updateStatus(Long id, boolean isActive) {
        Item item = repository.findById(id).orElseThrow(() -> new RuntimeException("Элемент не найден"));
        item.setActive(isActive);
        repository.save(item);
    }
}